import { LOCAL_STORAGE_INVOICE_ID } from "./constants";

export const saveInvoiceIdToLocalStorage = (invoiceId: number) => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(LOCAL_STORAGE_INVOICE_ID, String(invoiceId));
};
export const getInvoiceIdFromLocalStorage = () => {
  if (typeof localStorage === "undefined") return;
  const storedId = localStorage.getItem(LOCAL_STORAGE_INVOICE_ID);
  if (!isNaN(Number(storedId))) return Number(storedId);
  return;
};

export const clearInvoiceIdInLocalStorage = () => {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(LOCAL_STORAGE_INVOICE_ID);
};
