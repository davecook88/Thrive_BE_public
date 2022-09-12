import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import ApiAdaptor from "../../backend/apiAdaptor";
import { PaymentConfirmationPageComponent } from "../../components/pages/paymentConfirmation/PaymentConfirmationPageComponent";

interface PaymentConfirmationPageProps {
  paymentIntentId: string;
}

const PaymentConfirmationPage: React.FC<PaymentConfirmationPageProps> = ({
  paymentIntentId,
}) => {
  const [paymentConfirmation, setPaymentConfirmation] = useState();

  useEffect(() => {
    ApiAdaptor.getPaymentConfirmation(paymentIntentId).then(
      setPaymentConfirmation
    );
  }, []);

  useEffect(() => {
    if (paymentConfirmation) console.log(JSON.stringify(paymentConfirmation));
  }, [paymentConfirmation]);

  return (
    <section>
      {paymentConfirmation && (
        <PaymentConfirmationPageComponent {...paymentConfirmation} />
      )}
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { payment_intent } = context.query;

  return {
    props: { paymentIntentId: payment_intent }, // will be passed to the page component as props
  };
};

export default PaymentConfirmationPage;
