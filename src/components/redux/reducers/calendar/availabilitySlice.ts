import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  loadStatus: "ready",
  available: [
    {
      from: new Date("2022-06-16T12:48:33.492Z"),
      until: new Date("2022-06-16T14:48:33.492Z"),
      status: "available",
    },
  ],
  booked: [
    {
      from: new Date("2022-06-20"),
      until: new Date("2022-06-25"),
      status: "booked",
    },
  ],
  unavailable: [],
};

export const availabilitySlice = createSlice({
  name: "availability",
  initialState,
  reducers: {
    setAvailability: (state, action: PayloadAction<SetAvailabilityAction>) => {
      state[action.payload.status] = action.payload.entries;
    },
  },
  extraReducers: (builder) => {},
});

export const { setAvailability } = availabilitySlice.actions;

export const fetchAvailabilityAsync = createAsyncThunk(
  "availability/fetchAvailability",
  async () => {
    const response = await fetchAvailability();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

/* 
  TODO: add call to API here


  */
async function fetchAvailability() {
  return {
    data: {},
  };
}

export const selectAvailability = (state: RootState) => state.availability;
export default availabilitySlice.reducer;
