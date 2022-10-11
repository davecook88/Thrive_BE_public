import React from "react";
import { CheckoutScreen } from "../../components/payment/CheckoutScreen";
import { useInvoice } from "../../hooks/useInvoice";

const OrderPage = () => {
  return (
    <section className="w-full p-12">
      <div className="m-auto md:w-4/6">
        <CheckoutScreen />
      </div>
    </section>
  );
};

export default OrderPage;
