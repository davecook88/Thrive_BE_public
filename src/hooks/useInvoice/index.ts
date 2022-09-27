import { useEffect } from "react";
import ApiAdaptor from "../../backend/apiAdaptor";
import { useAppDispatch, useAppSelector } from "../../components/redux/hooks";
import {
  createInvoiceAsync,
  selectInvoiceState,
  setInvoice,
} from "../../components/redux/reducers/invoice/invoiceSlice";
import { getInvoiceIdFromLocalStorage } from "../../components/redux/reducers/invoice/utils";

export const useInvoice = () => {
  const dispatch = useAppDispatch();
  const { invoice } = useAppSelector(selectInvoiceState);

  const getSavedInvoice = async (invoiceId: number) => {
    const invoice = await ApiAdaptor.getInvoice(invoiceId);
    if (invoice) dispatch(setInvoice(invoice));
    else createInvoice();
  };

  const createInvoice = () => dispatch(createInvoiceAsync());

  useEffect(() => {
    const savedInvoiceId = getInvoiceIdFromLocalStorage();
    if (savedInvoiceId) getSavedInvoice(savedInvoiceId);
    else createInvoice();
  }, []);

  return {
    invoice,
  };
};
