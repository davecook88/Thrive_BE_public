import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ApiAdaptor from "../../../../backend/apiAdaptor";
import { Invoice } from "../../../types/invoice/responses";

export const useOrderSummary = () => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const router = useRouter();
  const query = router.query;
  const _invoiceId = Array.isArray(query.invoiceId)
    ? query.invoiceId[0]
    : (query.invoiceId as string);

  useEffect(() => {
    if (!_invoiceId) return;
    ApiAdaptor.getInvoice(Number(_invoiceId)).then(setInvoice);
  });

  return { invoice };
};
