import { User } from "../user/responses";
import { PrivateClassOption } from "../privateClass/responses";

export interface ListTeachersResponse extends User {
  id: number;
  name: string;
  course_id: number;
  email: string;
  subtitle?: string;
  photo_url?: string;
  description?: string;
}

export interface ListCourseTeachersResponse extends ListTeachersResponse {
  teacher_id: number;
}
export interface ListClassTeachersResponse extends ListTeachersResponse {
  course_teacher_id: number;
}

export interface TeacherResponse extends ListTeachersResponse {
  private_class_options: PrivateClassOption[];
}
