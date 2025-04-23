import { Request, Response } from "express";
import { updateProgress, hasCompletedAll } from "../utils/progress-tracker";
import { REQUIRED_COURSE_IDS, BONUS_COURSE_IDS } from "../constants/courses";
import { enrollInBonusCourse } from "../services/bonus.service";

export const handleWebhook = async (req: Request, res: Response) => {
  const { action, payload } = req.body;

  if (action !== "completed" || payload.resource !== "enrollment") {
    return res.status(200).send("Ignored");
  }

  const userId = payload.user.id;
  const courseId = payload.course.id;

  updateProgress(userId, courseId);

  if (hasCompletedAll(userId, REQUIRED_COURSE_IDS)) {
    for (const bonusId of BONUS_COURSE_IDS) {
      await enrollInBonusCourse(userId, bonusId);
    }
  }

  res.status(200).send("Processed");
};
