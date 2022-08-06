import { User } from "../user/responses";

export interface ListTeachersResponse extends User {
  id: number;
  course_id: number;
  email: string;
}

export interface ListCourseTeachersResponse extends ListTeachersResponse {
  teacher_id: number;
}
export interface ListClassTeachersResponse extends ListTeachersResponse {
  course_teacher_id: number;
}
