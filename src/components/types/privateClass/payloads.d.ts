export interface PrivateClassOptionBase {
  name: string;
  cents_price: number;
  credits_price: number;
  length_minutes: number;
  teacher_id: number;
  description: string;
}

export interface CreatePrivateClassCoursePayload {
  max_students: number;
  start_time: Date;
  minutes_duration: number;
  max_students: number;
}

export interface CreatePrivateClassPackagePayload {
  class_count: number;
  discount_percentage: number;
}
