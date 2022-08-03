import { CourseBase } from "./payloads";

export interface Course extends CourseBase {
  id: string;
  live_classes: CourseClass[];
}

export interface CourseClass extends CourseClassBase {
  id: string;
}
