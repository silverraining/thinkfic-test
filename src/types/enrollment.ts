export interface Enrollment {
  id: number;
  user_email: string;
  user_name: string;
  user_id: number;
  course_name: string;
  course_id: number;
  percentage_completed: number;
  expired: boolean;
  is_free_trial: boolean;
  completed: boolean;
  started_at: string;
  activated_at: string;
  completed_at: string;
  updated_at: string;
  expiry_date: string;
}
export interface BonusEnrollmentRequest {
  userId: number;
}
