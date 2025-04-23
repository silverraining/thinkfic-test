import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const registerWebhook = async () => {
  try {
    const response = await axios.post(
      `${process.env.THINKIFIC_BASE_URL}/webhooks`,
      {
        topic: "enrollment.completed",
        target_url: process.env.WEBHOOK_TARGET_URL,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.THINKIFIC_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Webhook 등록 완료:", response.data);
  } catch (error: any) {
    console.error(
      "❌ Webhook 등록 실패:",
      error.response?.data || error.message
    );
  }
};
