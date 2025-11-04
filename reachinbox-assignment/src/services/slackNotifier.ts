import axios from "axios";

const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;

export async function notifySlack(subject: string, from: string, account: string) {
  if (!SLACK_WEBHOOK) return console.warn("⚠️ No Slack webhook configured.");

  try {
    const message = {
      text: `📬 *Interested Email Alert*\nFrom: ${from}\nSubject: ${subject}\nAccount: ${account}`,
    };
    await axios.post(SLACK_WEBHOOK, message);
    console.log("✅ Slack notification sent.");
  } catch (err) {
    console.error("❌ Slack notification failed:", err);
  }
}
