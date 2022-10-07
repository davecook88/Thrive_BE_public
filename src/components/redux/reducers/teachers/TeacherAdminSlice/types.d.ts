import { PrivateClassOption } from "../../../../types/privateClass/responses";
import { TeacherResponse } from "../../../../types/teacher/responses";

export interface SetTeacherIdAction {
  teacherId: number;
}

export interface SetSelectedPrivateClassOption {
  privateClassOptionId: number | null;
}

export interface TeacherAdminState {
  teacher?: TeacherResponse;
  teacherId?: number;
  privateClassOptions: PrivateClassOption[];
  selectedPrivateClassOption: PrivateClassOption | null;
}
