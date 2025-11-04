import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import { syncAllEmails, searchEmails } from "./services/emailService";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Root route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// 🔍 Search emails with account + category + pagination
app.get("/search", async (req, res) => {
  try {
    const q = (req.query.q as string) || "";
    const account = req.query.account as string | undefined;
    const category = (req.query.category as string) || "All"; // ✅ new
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortParam = (req.query.sort as string) || "date:desc";

    const [sortField, sortOrder] = sortParam.split(":");
    const from = (page - 1) * limit;

    // Fetch results
    let results = await searchEmails(q, account, {
      from,
      size: limit,
      sort: [{ [sortField]: { order: sortOrder as "asc" | "desc" } }],
    });

    // 🧹 Clean up and tag each email with a category
    const cleaned = results.map((email: any) => {
      const source = email._source || email;
      const subject = source.subject?.toLowerCase() || "";
      let detectedCategory = "Other";

      // Simple category detection (customize freely)
      if (subject.includes("meeting") || subject.includes("call"))
        detectedCategory = "Meeting Booked";
      else if (subject.includes("job") || subject.includes("hiring"))
        detectedCategory = "Interested";
      else if (subject.includes("unsubscribe") || subject.includes("spam"))
        detectedCategory = "Spam";
      else if (subject.includes("not interested"))
        detectedCategory = "Not Interested";
      else if (subject.includes("vacation") || subject.includes("out of office"))
        detectedCategory = "Out of Office";

      return {
        id: email._id || source.id || null,
        account: source.account || "Unknown",
        category: detectedCategory,
        from: source.from || "Unknown sender",
        subject: source.subject || "(No Subject)",
        date: source.date || "N/A",
        snippet: (source.text || "").substring(0, 120) + "...",
      };
    });

    // ✅ Filter by category before sending to frontend
    const filtered =
      category === "All"
        ? cleaned
        : cleaned.filter((mail) => mail.category === category);

    res.json({
      query: q,
      account: account || "All",
      category,
      page,
      limit,
      sort: sortParam,
      count: filtered.length,
      results: filtered,
    });
  } catch (err) {
    console.error("❌ Search error:", err);
    res.status(500).json({ error: "Search failed", details: err });
  }
});

const PORT = process.env.PORT || 5500;

app.listen(PORT, async () => {
  console.log("🚀 Starting email sync service...");
  try {
    await syncAllEmails();
  } catch (err) {
    console.error("❌ Failed to sync emails:", err);
  }
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

export default app;
