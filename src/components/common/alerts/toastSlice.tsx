import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

interface ToastState {
  message?: string;
}

const initialState: ToastState = {
  message: undefined,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ToastState>) => {
      state.message = action.payload.message;
    },
  },
});
export const { showToast } = toastSlice.actions;
export const selectToast = (state: RootState) => state.toast;
export default toastSlice.reducer;
