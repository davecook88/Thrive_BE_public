import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";
import { Course, CourseClassResponse } from "../types/course/responses";

interface AdminState {
  selectedCourse?: Course;
  selectedCourseClass?: CourseClassResponse;
}

const initialState: AdminState = {
  selectedCourse: undefined,
  selectedCourseClass: undefined,
};

export interface SetSelectedCourseAction {
  selectedCourse?: Course;
}

export interface SetSelectedCourseClassAction {
  selectedCourseClass?: CourseClassResponse;
}

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setSelectedCourse: (
      state,
      action: PayloadAction<SetSelectedCourseAction>
    ) => {
      state.selectedCourse = action.payload.selectedCourse;
    },
    setSelectedCourseClass: (
      state,
      action: PayloadAction<SetSelectedCourseClassAction>
    ) => {
      state.selectedCourseClass = action.payload.selectedCourseClass;
    },
  },
});
export const { setSelectedCourse, setSelectedCourseClass } = adminSlice.actions;
export const selectAdmin = (state: RootState) => state.admin;
export default adminSlice.reducer;
