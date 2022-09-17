import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { TeacherResponse } from "../../../../types/teacher/responses";
import ApiAdaptor from "../../../../../backend/apiAdaptor";

interface TeacherProfilePageState {
  teacher?: TeacherResponse;
}

const initialState: TeacherProfilePageState = {
  teacher: undefined,
};

export interface SetTeacherAction {
  teacher: TeacherResponse;
}

export const fetchTeacherAsync = createAsyncThunk(
  "teacherProfilePage/fetchTeacher",
  async (action: { teacherId: number }) => {
    const response = await ApiAdaptor.getTeacherById(action.teacherId);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

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
