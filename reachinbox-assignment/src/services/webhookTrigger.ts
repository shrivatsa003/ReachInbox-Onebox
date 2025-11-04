import axios from "axios";

export async function triggerWebhook(payload: any) {
  const WEBHOOK_URL = process.env.INTERESTED_WEBHOOK;
  if (!WEBHOOK_URL) return console.warn("⚠️ No webhook URL configured.");

  try {
    await axios.post(WEBHOOK_URL, payload);
    console.log("✅ Webhook triggered.");
  } catch (err) {
    console.error("❌ Webhook trigger failed:", err);
  }
}
