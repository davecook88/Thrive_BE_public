import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddAvailabilityEntryPayload,
  EditAvailabilityEntryPayload,
  EditAvailabilityObject,
  EditAvailabilityState,
} from "../../../types/availability/editAvailability";
import { RootState } from "../../store";
import { v4 as uuidv4 } from "uuid";

const blankAvailabilityEntry = {
  start: null,
  end: null,
};

export const DAY_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const initialAvailabilityEntries: EditAvailabilityObject = DAY_NAMES.reduce(
  (obj, name) => {
    (obj as any)[name] = [{ ...blankAvailabilityEntry }];
    return obj;
  },
  {}
);

const initialState: EditAvailabilityState = {
  dayNames: DAY_NAMES,
  config: initialAvailabilityEntries,
};

export const editAvailabilityConfigSlice = createSlice({
  name: "editAvailabilityConfig",
  initialState,
  reducers: {
    addEditAvailabilityDayEntry: (
      state,
      action: PayloadAction<AddAvailabilityEntryPayload>
    ) => {
      state.config[action.payload.dayName] = [
        ...state.config[action.payload.dayName],
        { ...blankAvailabilityEntry, id: uuidv4() },
      ];
    },
    removeEditAvailabilityDayEntry: (
      state,
      action: PayloadAction<AddAvailabilityEntryPayload>
    ) => {
      const dayUpdates = state.config[action.payload.dayName];
      if (dayUpdates.length === 1) return;
      dayUpdates.pop();
    },
    updateEditAvailabilityDayEntry: (
      state,
      action: PayloadAction<EditAvailabilityEntryPayload>
    ) => {
      const dayUpdates = state.config[action.payload.dayName];
      const updatedUpdates = dayUpdates.map((entry, i) => {
        if (i === action.payload.entryIndex) return action.payload.entry;
        return entry;
      });
      state.config[action.payload.dayName] = updatedUpdates;
    },
  },
  extraReducers: (builder) => {},
});
export const {
  addEditAvailabilityDayEntry,
  removeEditAvailabilityDayEntry,
  updateEditAvailabilityDayEntry,
} = editAvailabilityConfigSlice.actions;
export const editAvailabilityConfig = (state: RootState) =>
  state.editAvailabilityConfig;
export default editAvailabilityConfigSlice.reducer;
