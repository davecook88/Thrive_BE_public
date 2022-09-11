import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiAdaptor from "../../../../backend/apiAdaptor";

import { RootState } from "../../store";
import { TeacherSliceState } from "./types";

const initialState: TeacherSliceState = {
  allTeachers: [],
};

export const fetchTeachersAsync = createAsyncThunk(
  "teacherSlice/fetchTeachers",
  async () => {
    const response = await ApiAdaptor.listTeachers();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const teacherSlice = createSlice({
  name: "teacherSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeachersAsync.fulfilled, (state, action) => {
      state.allTeachers = action.payload;
    });
  },
});

export const selectTeachers = (state: RootState) => state.teachers;
export default teacherSlice.reducer;
