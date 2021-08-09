import React from "react";
import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface themeMode {
    value: string | null
}
  
  // Define the initial state using that type
// const initialState: themeMode = {
//     value: 'dark'
// }

export const themeMode = createSlice({
  name: 'themeMode',
  initialState: {
    value: 'dark',
  },
  reducers: {
    changeDarkMode: (state, action) => {
      // state.value == "light"
      // state.value = "Krishna"
      state.value = action.payload


    },
  },
})

// Action creators are generated for each case reducer function
export const { changeDarkMode } = themeMode.actions

export default themeMode.reducer