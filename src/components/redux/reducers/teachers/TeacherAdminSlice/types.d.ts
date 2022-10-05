import { TeacherResponse } from "../../../../types/teacher/responses";

export interface SetTeacherIdAction {
  teacherId: number;
}

export interface TeacherAdminState {
  teacher?: TeacherResponse;
  teacherId?: number;
}
