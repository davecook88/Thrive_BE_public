import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";
import { Course, CourseClassResponse } from "../types/course/responses";
import { LevelResponse, UnitResponse } from "../types/level/response";

interface AdminState {
  selectedCourse?: Course;
  selectedCourseClass?: CourseClassResponse;
  selectedLevel?: LevelResponse;
  selectedUnit?: UnitResponse;
}

const initialState: AdminState = {
  selectedCourse: undefined,
  selectedCourseClass: undefined,
  selectedLevel: undefined,
  selectedUnit: undefined,
};

export interface SetSelectedCourseAction {
  selectedCourse?: Course;
}

export interface SetSelectedCourseClassAction {
  selectedCourseClass?: CourseClassResponse;
}

export interface SetSelectedLevelAction {
  selectedLevel?: LevelResponse;
}

export interface SetSelectedUnitAction {
  selectedUnit?: UnitResponse;
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
    setSelectedLevel: (
      state,
      action: PayloadAction<SetSelectedLevelAction>
    ) => {
      state.selectedLevel = action.payload.selectedLevel;
    },
    setSelectedUnit: (state, action: PayloadAction<SetSelectedUnitAction>) => {
      state.selectedUnit = action.payload.selectedUnit;
    },
  },
});
export const {
  setSelectedCourse,
  setSelectedCourseClass,
  setSelectedLevel,
  setSelectedUnit,
} = adminSlice.actions;
export const selectAdmin = (state: RootState) => state.admin;
export default adminSlice.reducer;
