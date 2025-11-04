import imaps from "imap-simple";
import { simpleParser } from "mailparser";
import { imapConfig1, imapConfig2 } from "../config/imapConfig";
import { elasticClient } from "../config/elasticsearch";
import { aiCategorizeEmail } from "./aiCategorizer";
import { notifySlack } from "./slackNotifier";
import { triggerWebhook } from "./webhookTrigger";

interface IMAPConfig {
  imap: {
    user: string;
    password: string;
    host: string;
    port: number;
    tls: boolean;
    tlsOptions?: { rejectUnauthorized?: boolean };
  };
}

// 🔹 Fetch and index emails
async function fetchEmails(imapConfig: IMAPConfig, accountLabel: string) {
  try {
    const connection = await imaps.connect(imapConfig);
    await connection.openBox("INBOX");

    const delay = 30 * 24 * 3600 * 1000; // 30 days
    const since = new Date(Date.now() - delay);
    const searchCriteria = ["ALL", ["SINCE", since.toISOString()]];
    const fetchOptions = { bodies: [""], markSeen: false };

    const messages = await connection.search(searchCriteria, fetchOptions);
    console.log(`\n📨 Emails for ${accountLabel}:`);

    for (const item of messages) {
      const all = item.parts.find((part: any) => part.which === "");
      if (!all?.body) continue;

      try {
        const parsed = await simpleParser(all.body);
        const from = parsed.from?.text || "Unknown Sender";
        const subject = parsed.subject || "(No Subject)";
        const date = parsed.date || new Date();
        const text = parsed.text || "";
        const html = parsed.html || "";

        console.log(`From: ${from} | Subject: ${subject}`);

        // 🧠 Categorize the email
        const category = await aiCategorizeEmail(subject, text);

        // ✅ Store email in Elasticsearch with category
        await elasticClient.index({
          index: "emails",
          document: {
            account: accountLabel,
            from,
            subject,
            date,
            text,
            html,
            category,
          },
        });

        console.log(`✅ Indexed email (${category}) successfully.`);

        // 🚀 If category = "Interested", trigger Slack + Webhook
        if (category === "Interested") {
          await notifySlack(subject, from, accountLabel);
          await triggerWebhook({ from, subject, account: accountLabel, date });
        }

      } catch (parseErr) {
        console.error(`⚠️ Error parsing email for ${accountLabel}:`, parseErr);
      }
    }

    // 🔔 Listen for new incoming emails (real-time)
    connection.on("mail", async () => {
      console.log(`\n✉️ New email arrived for ${accountLabel}!`);
    });

  } catch (err) {
    console.error(`❌ Error fetching emails for ${accountLabel}:`, err);
  }
}

// ✅ Sync emails from both accounts
export async function syncAllEmails() {
  console.log("\n🚀 Syncing all emails...");
  await Promise.all([
    fetchEmails(imapConfig1, "Account 1"),
    fetchEmails(imapConfig2, "Account 2"),
  ]);
  console.log("✅ Email sync completed.");
}

// 🔍 Enhanced search emails using Elasticsearch (with pagination & sorting)
export async function searchEmails(
  query: string,
  account?: string,
  options?: { from?: number; size?: number; sort?: any }
) {
  try {
    const must: any[] = [];

    if (query) {
      must.push({
        multi_match: {
          query,
          fields: ["subject", "from", "text"],
          fuzziness: "AUTO",
        },
      });
    }

    if (account) {
      must.push({ match: { account } });
    }

    const response = await elasticClient.search({
      index: "emails",
      from: options?.from || 0,
      size: options?.size || 10,
      sort: options?.sort || [{ date: { order: "desc" } }],
      query: { bool: { must } },
    });

    return response.hits.hits;
  } catch (error) {
    console.error("❌ Error in searchEmails:", error);
    throw error;
  }
}
