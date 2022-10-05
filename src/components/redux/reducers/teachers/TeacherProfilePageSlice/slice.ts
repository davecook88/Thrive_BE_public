import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { fetchTeacherAsync } from "./thunks";
import { SetTeacherAction, TeacherProfilePageState } from "./types";

const initialState: TeacherProfilePageState = {
  teacher: undefined,
};

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
  extraReducers: (builder) => {
    builder.addCase(fetchTeacherAsync.fulfilled, (state, action) => {
      state.teacher = action.payload;
    });
  },
});
export const { setSelectedProfilePageTeacher } =
  teacherProfilePageSlice.actions;

export const selectTeacherProfilePageState = (state: RootState) =>
  state.teacherProfilePage;
export default teacherProfilePageSlice.reducer;
