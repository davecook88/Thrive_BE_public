import React, { useState } from "react";
import { createSlice } from "@reduxjs/toolkit";

const darkmodeStatus =
  typeof window !== "undefined" ? localStorage.getItem("theme") : null;

export const themeMode = createSlice({
  name: "themeMode",
  initialState: {
    value: darkmodeStatus,
  },
  reducers: {},
});

// Action creators are generated for each case reducer function

export default themeMode.reducer;
