import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { BookingsState, SetPackageBookingsAction } from "./types";
import { fetchAllPackageBookings } from "./utils";

export const initialState: BookingsState = {
  packageBookings: [],
  activePackageBookings: [],
};

export const fetchActivePackageBookingsAsync = createAsyncThunk(
  "bookings/fetchActivePackageBookings",
  async () => {
    // The value we return becomes the `fulfilled` action payload
    return await fetchAllPackageBookings(true);
  }
);

export const fetchAllPackageBookingsAsync = createAsyncThunk(
  "bookings/fetchAllPackageBookings",
  async () => {
    // The value we return becomes the `fulfilled` action payload
    return await fetchAllPackageBookings(false);
  }
);

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setPackageBookings: (
      state,
      action: PayloadAction<SetPackageBookingsAction>
    ) => {
      state.packageBookings = action.payload.packageBookings;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchActivePackageBookingsAsync.fulfilled,
      (state, action) => {
        state.activePackageBookings = action.payload.bookings;
      }
    );
    builder.addCase(fetchAllPackageBookingsAsync.fulfilled, (state, action) => {
      state.packageBookings = action.payload.bookings;
    });
  },
});

export const { setPackageBookings } = bookingsSlice.actions;

export const selectBookings = (state: RootState) => state.bookings;
export default bookingsSlice.reducer;
