export interface CourseBase {
  name: string;
  description: string;
  difficulty: number;
  max_students?: number;
  price: number;
  difficulty: number;
}

export interface CreateCoursePayload extends CourseBase {
  teacher_ids: number[];
  student_ids?: number[];
}

export interface CourseClassBase {
  name: string;
  description?: string;
  start_time: Date;
}

export interface CreateCourseClassPayload extends CourseClassBase {
  course_id: number;
  minutes_duration: number;
  class_teachers: number[];
  class_students?: number[];
}

export interface UpdateCourseClassPayload extends CreateCourseClassPayload {
  id: number;
}
