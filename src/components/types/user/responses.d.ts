export interface User {
  user_id: number;
  user_name: string;
  email: string;
}

export interface UserProfile {
  user_id: number;
  user_name: string;
  email: string;
  admin: boolean;
  google_id: string;
  teacher_id: number;
  student_id?: number;
  teaching_courses: Course[];
  studying_courses: Course[];
}
