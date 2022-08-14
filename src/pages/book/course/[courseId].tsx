import React from "react";
import StripePayment from "../../../components/payment/stripe/StripePayment";

const BookCoursePage = () => {
  return <StripePayment amount={100} coursePackage={"abc"} />;
};

export default BookCoursePage;
