import { CourseClassBase } from "./responses";

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

  unit_id: number;
}

export interface UpdateCoursePayload extends CreateCoursePayload {
  student_ids: number[];
  unit_id: number;
}

export interface CreateCourseClassPayload extends CourseClassBase {
  unit_id: number;
  minutes_duration: number;
  class_teachers: number[];
  class_students?: number[];
}

export interface UpdateCourseClassPayload extends CreateCourseClassPayload {}
