import { useEffect } from "react";
import ApiAdaptor from "../../backend/apiAdaptor";
import { useAppDispatch, useAppSelector } from "../../components/redux/hooks";
import {
  selectInvoiceState,
  setInvoice,
} from "../../components/redux/reducers/invoice/invoiceSlice";
import {
  addCourseLineItem,
  addPackageBookingLineItem,
  createInvoiceAsync,
  deleteLineItem,
} from "../../components/redux/reducers/invoice/thunks";
import { getInvoiceIdFromLocalStorage } from "../../components/redux/reducers/invoice/utils";

export const useInvoice = () => {
  const dispatch = useAppDispatch();
  const { invoice } = useAppSelector(selectInvoiceState);

  const getSavedInvoice = async (invoiceId: number) => {
    const invoice = await ApiAdaptor.getInvoice(invoiceId);
    console.log("savedInvoice", { invoice });
    if (invoice && invoice.detail !== "Invoice not found")
      dispatch(setInvoice({ invoice }));
    else createInvoice();
  };

  const createInvoice = () => dispatch(createInvoiceAsync());

  useEffect(() => {
    const savedInvoiceId = getInvoiceIdFromLocalStorage();
    if (savedInvoiceId) getSavedInvoice(savedInvoiceId);
    else createInvoice();
  }, []);

  const addPackageBookingToInvoice = (packageBookingId: number) => {
    if (!invoice) {
      throw new Error("No invoice to add line item to");
    }
    dispatch(
      addPackageBookingLineItem({
        invoiceId: invoice.id,
        packageBookingId,
      })
    );
  };

  const addCourseToInvoice = (courseId: number) => {
    if (!invoice) {
      throw new Error("No invoice to add line item to");
    }
    dispatch(
      addCourseLineItem({
        invoiceId: invoice.id,
        courseId,
      })
    );
  };

  const deleteInvoiceLineItem = (lineItemId: number) => {
    if (!invoice) {
      throw new Error("No invoice");
    }
    dispatch(deleteLineItem({ invoiceId: invoice.id, lineItemId }));
  };

  return {
    invoice,
    addPackageBookingToInvoice,
    addCourseToInvoice,
    deleteInvoiceLineItem,
  };
};
