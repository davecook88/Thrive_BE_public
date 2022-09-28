import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useInvoice } from "../../../hooks/useInvoice";
import LoggedOutError from "../../auth/LoggedOutMessage";
import { StandardButton } from "../../styled/Buttons";
import { InvoiceConfirmation } from "../InvoiceConfirmation";
import StripePayment from "../stripe/StripePayment";
import { CheckoutScreenProps } from "./types";

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  keepBrowsing,
}) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { invoice } = useInvoice();
  const { user } = useAuth();
  if (!invoice) return <div>No invoice</div>;
  if (!user) return <LoggedOutError />;

  const showButtons = () => (
    <div className="w-full flex justify-around m-2">
      <div className="w-1 flex justify-around mt-4">
        {keepBrowsing && (
          <StandardButton className="btn-sm text-xs" onClick={keepBrowsing}>
            Keep browsing
          </StandardButton>
        )}
      </div>
      <StandardButton
        onClick={() => setShowPaymentForm(true)}
        className="font-bold bg-primary border-2 border-primary hover:bg-base-100 hover:text-primary"
      >
        Pay now
      </StandardButton>
    </div>
  );

  const showStripePayment = () => (
    <StripePayment
      amount={invoice.total}
      currency="usd"
      invoice_id={invoice.id}
      user_email={user.details.email}
      user_google_id={user.details.google_id || ""}
      user_id={Number(user.details.id)}
      returnUrl="/payment-confirmation"
    />
  );
  return (
    <div>
      <InvoiceConfirmation />
      {showPaymentForm ? showStripePayment() : showButtons()}
    </div>
  );
};
