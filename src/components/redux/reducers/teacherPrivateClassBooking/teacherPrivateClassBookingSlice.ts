import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDefaultDisplayDates } from "../../../scheduling/BigBookingCalendar/utils";
import { RootState } from "../../store";
import {
  TeacherPrivateClassBookingsState,
  SetPackageBookingsAction,
  SetPrivateClassOptionAction,
  SetSelectedAvailabilitySlotAction,
  SetActiveBookingToApplyAction,
  SetPrivateClassCalendarDisplayedDatesAction,
  SetPrivateClassPackageOptionAction,
} from "./types";
import { fetchAllPackageBookings } from "./utils";

const getSerializableDisplayDates = () => {
  const dates = getDefaultDisplayDates();
  return {
    start: dates.start.toISOString(),
    end: dates.end.toISOString(),
  };
};

export const initialState: TeacherPrivateClassBookingsState = {
  packageBookings: [],
  activePackageBookings: [],
  calendarDisplayedDates: getSerializableDisplayDates(),
  selectedAvailabilitySlot: null,
  selectedPrivateClassOption: null,
  selectedPrivateClassPackage: null, // Student wants to book and pay for a new package
  packageBookingToApply: null, // An existing, paid package is used to book a class instead of paying per class
};

export const fetchActivePackageBookingsAsync = createAsyncThunk(
  "teacherPrivateClassBooking/fetchActivePackageBookings",
  async () => {
    // The value we return becomes the `fulfilled` action payload
    return await fetchAllPackageBookings(true);
  }
);

export const fetchAllPackageBookingsAsync = createAsyncThunk(
  "teacherPrivateClassBooking/fetchAllPackageBookings",
  async () => {
    // The value we return becomes the `fulfilled` action payload
    return await fetchAllPackageBookings(false);
  }
);

export const teacherPrivateClassBookingSlice = createSlice({
  name: "teacherPrivateClassBooking",
  initialState,
  reducers: {
    setPackageBookings: (
      state,
      action: PayloadAction<SetPackageBookingsAction>
    ) => {
      state.packageBookings = action.payload.packageBookings;
    },

    setPrivateClassCalendarDisplayedDates: (
      state,
      action: PayloadAction<SetPrivateClassCalendarDisplayedDatesAction>
    ) => {
      state.calendarDisplayedDates = action.payload.displayedDates;
    },

    setPrivateClassOption: (
      state,
      action: PayloadAction<SetPrivateClassOptionAction>
    ) => {
      state.selectedPrivateClassOption = action.payload.privateClassOption;
    },

    setPackageOption: (
      state,
      action: PayloadAction<SetPrivateClassPackageOptionAction>
    ) => {
      state.selectedPrivateClassPackage = action.payload.packageOption;
    },

    setSelectedAvailabilitySlot: (
      state,
      action: PayloadAction<SetSelectedAvailabilitySlotAction>
    ) => {
      state.selectedAvailabilitySlot = action.payload.selectedAvailabilitySlot;
    },

    setPackageBookingToApply: (
      state,
      action: PayloadAction<SetActiveBookingToApplyAction>
    ) => {
      const { booking } = action.payload;
      if (booking === null) {
        state.packageBookingToApply = null;
        return;
      }
      if (!booking.active) {
        throw new Error("Booking is inactive");
      }
      if (booking.classes_booked >= booking.total_classes) {
        throw new Error("No remaining allowance for this package ");
      }
      state.packageBookingToApply = booking;
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

export const {
  setPackageBookings,
  setPrivateClassOption,
  setSelectedAvailabilitySlot,
  setPackageBookingToApply,
  setPrivateClassCalendarDisplayedDates,
  setPackageOption,
} = teacherPrivateClassBookingSlice.actions;

export const selectTeacherPrivateClassBookings = (state: RootState) =>
  state.teacherPrivateClassBooking;
export default teacherPrivateClassBookingSlice.reducer;
