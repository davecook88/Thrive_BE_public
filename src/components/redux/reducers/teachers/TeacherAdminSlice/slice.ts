import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { fetchTeacherAdminAsync } from "./thunks";
import { SetTeacherIdAction, TeacherAdminState } from "./types";

const initialState: TeacherAdminState = {
  teacherId: undefined,
  teacher: undefined,
};

const teacherAdminSlice = createSlice({
  name: "teacherAdmin",
  initialState,
  reducers: {
    setTeacherId: (state, action: PayloadAction<SetTeacherIdAction>) => {
      state.teacherId = action.payload.teacherId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTeacherAdminAsync.fulfilled, (state, action) => {
      state.teacher = action.payload;
    });
  },
});
export const { setTeacherId } = teacherAdminSlice.actions;

export const selectTeacherAdminState = (state: RootState) => state.teacherAdmin;
export default teacherAdminSlice.reducer;
