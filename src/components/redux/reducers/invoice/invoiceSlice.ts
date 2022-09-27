import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import {
  addCourseLineItem,
  addPackageBookingLineItem,
  createInvoiceAsync,
  deleteLineItem,
} from "./thunks";
import { InvoiceState, SetInvoiceAction } from "./types";
import { saveInvoiceIdToLocalStorage } from "./utils";

export const initialState: InvoiceState = {
  invoice: null,
};

export const invoiceSlice = createSlice({
  name: "teacherPrivateClassBooking",
  initialState,
  reducers: {
    setInvoice(state, action: PayloadAction<SetInvoiceAction>) {
      state.invoice = action.payload.invoice;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createInvoiceAsync.fulfilled, (state, action) => {
      if (!action.payload.id) return;
      saveInvoiceIdToLocalStorage(action.payload.id);
      state.invoice = action.payload;
    });

    builder.addCase(addPackageBookingLineItem.fulfilled, (state, action) => {
      state.invoice = action.payload;
    });
    builder.addCase(addCourseLineItem.fulfilled, (state, action) => {
      state.invoice = action.payload;
    });
    builder.addCase(deleteLineItem.fulfilled, (state, action) => {
      state.invoice = action.payload;
    });
  },
});

export const { setInvoice } = invoiceSlice.actions;

export const selectInvoiceState = (state: RootState) => state.invoice;
export default invoiceSlice.reducer;
