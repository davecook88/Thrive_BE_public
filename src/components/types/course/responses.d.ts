import { CourseBase } from "./payloads";

export interface Course extends CourseBase {
  id: string;
  live_classes: CourseClass[];
  course_teachers: ListTeachersResponse[];
}

export interface CourseClass extends CourseClassBase {
  id: string;
}
