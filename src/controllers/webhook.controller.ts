import { Request, Response } from "express";
import { updateProgress, hasCompletedAll } from "../utils/progress-tracker";
import { REQUIRED_COURSE_IDS, BONUS_COURSE_IDS } from "../constants/courses";
import { enrollInBonusCourse } from "../services/bonus.service";

export const handleWebhook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("📩 Webhook received:", req.body);

    const { payload } = req.body;
    if (!payload?.user?.id || !payload?.course?.id) {
      res.status(400).json({ error: "Invalid webhook payload" });
      return;
    }

    const userId = payload.user.id;
    const courseId = payload.course.id;

    updateProgress(userId, courseId);

    if (hasCompletedAll(userId, REQUIRED_COURSE_IDS)) {
      for (const bonusId of BONUS_COURSE_IDS) {
        await enrollInBonusCourse(userId, bonusId);
      }
    }
    res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
