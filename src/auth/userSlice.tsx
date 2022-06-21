import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../components/redux/store";
import { UserState } from "./types";

const initialState: UserState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.googleProfile = action.payload.googleProfile;
      state.user = action.payload.user;
    },
    clearUser: (state) => {
      state.googleProfile = undefined;
      state.user = undefined;
    },
  },
});
export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
