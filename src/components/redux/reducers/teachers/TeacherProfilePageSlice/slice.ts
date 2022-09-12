import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { TeacherResponse } from "../../../../types/teacher/responses";

interface TeacherProfilePageState {
  teacher?: TeacherResponse;
}

const initialState: TeacherProfilePageState = {
  teacher: undefined,
};

export interface SetTeacherAction {
  teacher: TeacherResponse;
}

const teacherProfilePageSlice = createSlice({
  name: "teacherProfilePage",
  initialState,
  reducers: {
    setSelectedProfilePageTeacher: (
      state,
      action: PayloadAction<SetTeacherAction>
    ) => {
      state.teacher = action.payload.teacher;
    },
  },
});
export const { setSelectedProfilePageTeacher } =
  teacherProfilePageSlice.actions;
export const selectTeacherProfilePageState = (state: RootState) =>
  state.teacherProfilePage;
export default teacherProfilePageSlice.reducer;
