import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ApiAdaptor from "../../../../backend/apiAdaptor";
import {
  AvailabilityState,
  SetAvailabilityAction,
} from "../../../types/calendar/types";
import { RootState } from "../../store";

/*
    Giving the option to explicitly 
    set available states, although this is the default.

    Each entry is an array of bookings or available entries
    with from and until date fields.
*/

const initialState: AvailabilityState = {
  loadStatus: "loading",
  booked: [],
  available: [],
  unavailable: [],
};
async function fetchAvailability() {
  return ApiAdaptor.getAvailability();
}

export const fetchAvailabilityAsync = createAsyncThunk(
  "availability/fetchAvailability",
  async () => {
    const response = await fetchAvailability();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const availabilitySlice = createSlice({
  name: "availability",
  initialState,
  reducers: {
    setAvailability: (state, action: PayloadAction<SetAvailabilityAction>) => {
      state[action.payload.status] = action.payload.entries;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAvailabilityAsync.fulfilled, (state, action) => {
      state.available = action.payload.available;
      state.booked = action.payload.booked;
      state.loadStatus = "ready";
      state.unavailable = action.payload.unavailable;
    });
  },
});

export const { setAvailability } = availabilitySlice.actions;

/* 
  TODO: add call to API here


  */

export const selectAvailability = (state: RootState) => state.availability;
export default availabilitySlice.reducer;
