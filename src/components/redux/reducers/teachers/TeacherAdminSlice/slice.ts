import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { fetchTeacherAdminAsync } from "./thunks";
import {
  SetSelectedPrivateClassOption,
  SetTeacherIdAction,
  TeacherAdminState,
} from "./types";

const initialState: TeacherAdminState = {
  teacherId: undefined,
  teacher: undefined,
  privateClassOptions: [],
  selectedPrivateClassOption: null,
};

const teacherAdminSlice = createSlice({
  name: "teacherAdmin",
  initialState,
  reducers: {
    setTeacherId: (state, action: PayloadAction<SetTeacherIdAction>) => {
      state.teacherId = action.payload.teacherId;
    },
    setSelectedPrivateClassOption: (
      state,
      action: PayloadAction<SetSelectedPrivateClassOption>
    ) => {
      const { privateClassOptionId } = action.payload;
      if (privateClassOptionId === null) {
        state.selectedPrivateClassOption = null;
      }
      state.selectedPrivateClassOption =
        state.privateClassOptions.find(
          (option) => option.id == privateClassOptionId
        ) || null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTeacherAdminAsync.fulfilled, (state, action) => {
      state.teacher = action.payload;
      state.privateClassOptions = action.payload.private_class_options;
    });
  },
});
export const { setTeacherId, setSelectedPrivateClassOption } =
  teacherAdminSlice.actions;

export const selectTeacherAdminState = (state: RootState) => state.teacherAdmin;
export default teacherAdminSlice.reducer;
