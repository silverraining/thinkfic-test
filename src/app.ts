import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import webhookRoutes from "./routes/webhook.route";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();

// 미들웨어 등록
app.use(morgan("dev"));
app.use(express.json());

// 라우터 등록
app.use("/webhook", webhookRoutes);

// 테스트용 라우트
app.use("/test", (_req, _res, next) => {
  next({ statusCode: 401, message: "test" });
});

// Swagger 문서 설정
setupSwagger(app);

// 전역 에러 핸들러도 여기에 추가 가능
// app.use(errorHandler);

export default app;
