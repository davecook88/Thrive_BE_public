import { Invoice } from "../../../types/invoice/responses";

export type InvoiceState = {
  invoice: Invoice | null;
};

export type SetInvoiceAction = {
  invoice: Invoice;
};
