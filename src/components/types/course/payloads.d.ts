export interface CreateCoursePayload {
  name: string;
  description: string;
  difficulty: number;
  max_students?: number;
  price: number;
  difficulty: number;
  teacher_ids: number[];
  student_ids?: number[];
}
