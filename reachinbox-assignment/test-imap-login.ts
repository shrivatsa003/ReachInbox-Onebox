import dotenv from "dotenv";
dotenv.config();
import Imap from "imap";

const imap = new Imap({
  user: process.env.IMAP_USER_1 || "",
  password: process.env.IMAP_PASS_1 || "",
  host: "imap.gmail.com",
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false }, // ✅ Fix for self-signed certs
});

imap.once("ready", function () {
  console.log("✅ IMAP connection successful!");
  imap.end();
});

imap.once("error", function (err: any) {
  console.error("❌ IMAP connection failed:", err);
});

imap.connect();
