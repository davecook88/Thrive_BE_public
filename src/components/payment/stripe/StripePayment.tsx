import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CreatePaymentIntentPayload } from "./types";
import ApiAdaptor from "../../../backend/apiAdaptor";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API as string);
interface StipePaymentProps {
  amount: number;
  coursePackage: string;
}
const StripePayment: React.FC<StipePaymentProps> = ({
  amount,
  coursePackage,
}) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // createPaymentIntent({ amount, coursePackage });
  }, []);

  const createPaymentIntent = async ({
    amount,
    coursePackage,
  }: {
    amount: number;
    coursePackage: string;
  }) => {
    const payload: CreatePaymentIntentPayload = {
      amount,
      course_package: coursePackage,
      currency: "usd",
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

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    createPaymentIntent({ amount: 100, coursePackage: "test_payment" });
  };

  return (
    <div className="w-full">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default StripePayment;
