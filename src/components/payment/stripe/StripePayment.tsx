import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CreatePaymentIntentPayload } from "./types";
import ApiAdaptor from "../../../backend/apiAdaptor";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API as string);
interface StripePaymentProps extends CreatePaymentIntentPayload {
  amount: number;
  returnUrl: string;
}

const StripePayment: React.FC<StripePaymentProps> = (props) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    createPaymentIntent(props);
  }, []);

  const createPaymentIntent = async ({
    amount,
    course_id,
    course_name,
    user_email,
    user_google_id,
    user_id,
  }: StripePaymentProps) => {
    const payload: CreatePaymentIntentPayload = {
      currency: "usd",
      amount,
      course_id,
      course_name,
      user_email,
      user_google_id,
      user_id,
    };
    const response = await ApiAdaptor.createStripePaymentIntent(payload);
    setClientSecret(response.secret);
  };
  const appearance: {
    theme: "stripe" | "night" | "flat" | "none" | undefined;
  } = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="w-full flex justify-center ">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm returnUrl={props.returnUrl} />
        </Elements>
      )}
    </div>
  );
};

export default StripePayment;
