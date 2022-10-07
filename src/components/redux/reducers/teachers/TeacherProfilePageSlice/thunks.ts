import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiAdaptor from "../../../../../backend/apiAdaptor";

export const fetchTeacherAsync = createAsyncThunk(
  "teacherProfilePage/fetchTeacher",
  async (action: { teacherId: number }) => {
    const response = await ApiAdaptor.getTeacherById(action.teacherId);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
