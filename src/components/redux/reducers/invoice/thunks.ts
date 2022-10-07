import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiAdaptor from "../../../../backend/apiAdaptor";
import { Invoice } from "../../../types/invoice/responses";
import { INVOICE_SLICE } from "./constants";

export const createInvoiceAsync = createAsyncThunk(
  `${INVOICE_SLICE}/createInvoiceAsync`,
  async () => {
    // The value we return becomes the `fulfilled` action payload
    return await ApiAdaptor.createInvoice();
  }
);

export const addPackageBookingLineItem = createAsyncThunk(
  `${INVOICE_SLICE}/addPackageBookingLineItem`,
  async (args: { invoiceId: number; packageBookingId: number }) => {
    // The value we return becomes the `fulfilled` action payload
    return (await ApiAdaptor.addPackageBookingLineItem(args.invoiceId, {
      package_booking_id: args.packageBookingId,
    })) as Invoice;
  }
);

export const addCourseLineItem = createAsyncThunk(
  `${INVOICE_SLICE}/addCourseLineItem`,
  async (args: { invoiceId: number; courseId: number }) => {
    // The value we return becomes the `fulfilled` action payload
    return (await ApiAdaptor.addCourseLineItem(args.invoiceId, {
      course_id: args.courseId,
    })) as Invoice;
  }
);

export const deleteLineItem = createAsyncThunk(
  `${INVOICE_SLICE}/deleteLineItem`,
  async (args: { invoiceId: number; lineItemId: number }) => {
    // The value we return becomes the `fulfilled` action payload
    return (await ApiAdaptor.deleteLineItem(
      args.invoiceId,
      args.lineItemId
    )) as Invoice;
  }
);
