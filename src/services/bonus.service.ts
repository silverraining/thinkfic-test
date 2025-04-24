import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const enrollInBonusCourse = async (userId: number, courseId: number) => {
  const res = await axios.post(
    `${process.env.THINKIFIC_BASE_URL}/enrollments`,
    {
      user_id: userId,
      course_id: courseId,
      activated_at: new Date().toISOString(),
      expiry_date: new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
    },
    {
      headers: {
        "X-Auth-API-Key": process.env.THINKIFIC_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};
