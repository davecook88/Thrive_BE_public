import { TeacherResponse } from "../../../../types/teacher/responses";

export interface SetTeacherAction {
  teacher: TeacherResponse;
}

export interface TeacherProfilePageState {
  teacher?: TeacherResponse;
}
