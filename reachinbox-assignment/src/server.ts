import app from "./app";
import { syncAllEmails } from "./services/emailService";

const PORT = process.env.PORT || 5500;

app.listen(PORT, async () => {
  console.log(`✅ Server started on port ${PORT}`);
  await syncAllEmails(); // start syncing emails when server starts
});
