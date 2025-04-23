import app from "./app";
import { registerWebhook } from "./services/webhook.service";

const PORT = process.env.PORT || 5400;

app.listen(PORT, async () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  await registerWebhook();
  console.log("📡 Registering webhook to:", process.env.WEBHOOK_TARGET_URL);
  console.log(`📘 Swagger docs at: http://localhost:${PORT}/api-docs`);
});
