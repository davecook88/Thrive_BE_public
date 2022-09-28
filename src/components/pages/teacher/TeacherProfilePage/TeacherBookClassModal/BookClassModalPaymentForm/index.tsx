import React from "react";

import { CheckoutScreen } from "../../../../../payment/CheckoutScreen";
import { useTeacherProfilePayment } from "../../hooks/useTeacherProfilePayment";
import { TeacherBookClassModalPaymentFormProps } from "./types";

export const TeacherBookClassModalPaymentForm: React.FC<
  TeacherBookClassModalPaymentFormProps
> = ({}) => {
  const { hidePaymentScreen } = useTeacherProfilePayment();

  return (
    <div>
      <CheckoutScreen keepBrowsing={hidePaymentScreen} />
    </div>
  );
};
