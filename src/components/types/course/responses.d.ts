import { LevelResponse } from "../level/response";
import { ListCourseStudentsResponse } from "../student/response";
import { ListCourseTeachersResponse } from "../teacher/responses";
import { CourseBase } from "./payloads";

export interface CourseMinimal extends CourseBase {
  id: number;
  level_id: number;
  start_time: string;
  end_time: string;
}

export interface Course extends CourseMinimal {
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

export interface CourseClassMinimal extends CourseClass {
  name: string;
  description?: any;
  course_id: number;
  start_time: Date;
  class_teachers: number[];
  class_students: number[];
}

export interface ProfileCourseEntry extends CourseMinimal {
  description: string;
  difficulty: number;
  max_students: number;
  price: number;
  unit_id: number;
  live_classes: LiveClass[];
}
