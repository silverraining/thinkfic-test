import { Router } from "express";
import { handleWebhook } from "../controllers/webhook.controller";

const router = Router();

// Thinkific Webhook에서 오는 POST 요청을 받는 엔드포인트
router.post("/thinkific", handleWebhook);

export default router;
