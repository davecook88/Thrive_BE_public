import React, { useEffect } from "react";
import { useInvoice } from "../../../hooks/useInvoice";
import { DeleteIconButton } from "../../common/buttons/DeleteIconButton";
import { StandardButton } from "../../styled/Buttons";
import { InvoiceConfirmationProps } from "./types";

export const InvoiceConfirmation: React.FC<InvoiceConfirmationProps> = ({
  keepBrowsing,
}) => {
  const { invoice, deleteInvoiceLineItem } = useInvoice();

  const onInvoiceUpdate = () => {
    if (!invoice?.line_items?.length) {
      if (keepBrowsing) keepBrowsing();
    }
  };

  useEffect(() => {
    onInvoiceUpdate();
  }, [invoice]);

  if (!invoice) return <div>"No invoice"</div>; // This should never happen

  if (!invoice.line_items?.length)
    return <div>You haven't selected anything to order yet.</div>;

  return (
    <div>
      <div className="w-full text-extrabold text-center">
        Confirm your order
      </div>
      <table className="table">
        <tbody>
          {invoice.line_items.map((lineItem) => (
            <tr>
              <td>{lineItem.name}</td>
              <td>${(lineItem.price / 100).toFixed(2)}</td>
              <td>
                <DeleteIconButton
                  onClick={() => deleteInvoiceLineItem(lineItem.id)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td className="font-bold">Total</td>
            <td className="font-bold">${(invoice.total / 100).toFixed(2)}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div className="w-full flex justify-around m-2">
        <div className="w-1 flex justify-around mt-4">
          {keepBrowsing && (
            <StandardButton className="btn-sm text-xs" onClick={keepBrowsing}>
              Keep browsing
            </StandardButton>
          )}
        </div>
        <StandardButton className="font-bold bg-primary border-2 border-primary hover:bg-base-100 hover:text-primary">
          Pay now
        </StandardButton>
      </div>
    </div>
  );
};
