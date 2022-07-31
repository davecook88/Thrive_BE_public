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
