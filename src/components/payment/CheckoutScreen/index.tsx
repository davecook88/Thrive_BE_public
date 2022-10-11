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
    <div className="m-2 flex w-full justify-around">
      {keepBrowsing && (
        <div className="mt-4 flex w-1 justify-around">
          <StandardButton className="btn-sm text-xs" onClick={keepBrowsing}>
            Keep browsing
          </StandardButton>
        </div>
      )}
      <StandardButton
        onClick={() => setShowPaymentForm(true)}
        className="z-100 w-4/6 cursor-pointer border-2 border-primary bg-primary font-bold hover:bg-base-100 hover:text-primary"
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
      returnUrl={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/order/${invoice.id}`}
    />
  );
  return (
    <div>
      <InvoiceConfirmation />
      {showPaymentForm ? showStripePayment() : showButtons()}
    </div>
  );
};
