import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ApiAdaptor from "../../../../backend/apiAdaptor";
import {
  AvailabilityState,
  SetAvailabilityAction,
} from "../../../types/calendar/types";
import { parseDbTime } from "../../../utils/dateMethods";
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

export const fetchAvailabilityAsync = createAsyncThunk(
  "availability/fetchAvailability",
  async (action: { teacherId: number; start: Date; end: Date }) => {
    console.log("fetchAvailabilityAsync", action);
    const response = await ApiAdaptor.getAvailability(
      action.teacherId,
      action.start,
      action.end
    );
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

const formatAvailabilityEntryForStore = (
  entry: GetAvailabilityResponseEntry
) => ({
  id: entry.id,
  end: parseDbTime(entry.end).getTime(),
  start: parseDbTime(entry.start).getTime(),
});

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
      state.available =
        action.payload.available?.map(formatAvailabilityEntryForStore) || [];
      state.booked =
        action.payload.booked?.map(formatAvailabilityEntryForStore) || [];
      state.loadStatus = "ready";
    });
  },
});

export const { setAvailability } = availabilitySlice.actions;

/* 
  TODO: add call to API here


  */

export const selectAvailability = (state: RootState) => state.availability;
export default availabilitySlice.reducer;
