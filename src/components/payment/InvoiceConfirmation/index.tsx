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
    <div className="rounded shadow">
      <div className="text-extrabold w-full rounded-t bg-primary p-2 text-center text-base-100">
        Booking Summary
      </div>
      <div className="w-full">
        <table className="m-auto table">
          <tbody>
            <tr className="border-b-2 border-black font-bold">
              <td>Your items</td>
              <td></td>
              <td></td>
            </tr>
            {invoice.line_items.map((lineItem) => (
              <tr>
                <td>
                  <DeleteIconButton
                    onClick={() => deleteInvoiceLineItem(lineItem.id)}
                  />
                </td>
                <td className="row-span-2">{lineItem.name}</td>
                <td> </td>
                <td>${(lineItem.price / 100).toFixed(2)}</td>
              </tr>
            ))}
            <tr className="border-t-2 border-black">
              <td></td> <td className="font-bold">Total</td>
              <td></td>
              <td className="font-bold">${(invoice.total / 100).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
