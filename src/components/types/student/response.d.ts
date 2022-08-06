export interface StudentBase extends User {
  id: number;
}

export interface ListStudentsResponse extends StudentBase {}

export interface ListCourseStudentsResponse extends ListStudentsResponse {
  student_id: number;
}
export interface ListClassStudentsResponse extends ListCourseStudentsResponse {
  course_student_id: number;
}
