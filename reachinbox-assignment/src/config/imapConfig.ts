import dotenv from "dotenv";
dotenv.config();

export const imapConfig1 = {
  imap: {
    user: process.env.IMAP_USER_1!,
    password: process.env.IMAP_PASS_1!,
    host: "imap.gmail.com",
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }, // ✅ allow self-signed
    authTimeout: 3000,
  },
};

export const imapConfig2 = {
  imap: {
    user: process.env.IMAP_USER_2!,
    password: process.env.IMAP_PASS_2!,
    host: "imap.gmail.com",
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }, // ✅ allow self-signed
    authTimeout: 3000,
  },
};
