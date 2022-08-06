import { ListCourseStudentsResponse } from "../student/response";
import { ListCourseTeachersResponse } from "../teacher/responses";
import { CourseBase } from "./payloads";

export interface Course extends CourseBase {
  id: number;
  live_classes: CourseClassResponse[];
  course_teachers: ListCourseTeachersResponse[];
  course_students: ListCourseStudentsResponse[];
}

export interface CourseClassBase {
  name: string;
  description?: string;
  start_time: Date;
  course_id: number;
}

export interface CourseClass extends CourseClassBase {
  id: number;
}

export interface CourseClassResponse extends CourseClass {
  name: string;
  description?: string;
  start_time: string;
  end_time: string;
  class_students: ListClassStudentsResponse[];
  class_teachers: ListClassTeachersResponse[];
}
