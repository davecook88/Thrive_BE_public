import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../redux/store";
import { ListTeachersResponse } from "../../../../types/teacher/responses";

interface TeacherProfilePageState {
  teacher?: ListTeachersResponse;
}

const initialState: TeacherProfilePageState = {
  teacher: undefined,
};

export interface SetTeacherAction {
  teacher: ListTeachersResponse;
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
