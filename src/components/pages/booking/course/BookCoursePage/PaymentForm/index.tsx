import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { useAuth } from "../../../../../../hooks/useAuth";
import { BookCoursePaymentFormProps } from "./types";
import Image from "next/image";
import { onSuccessCallback } from "../../../../../auth/utils";
import { CheckoutScreen } from "../../../../../payment/CheckoutScreen";
import { useInvoice } from "../../../../../../hooks/useInvoice";
import ApiAdaptor from "../../../../../../backend/apiAdaptor";

export const BookCoursePaymentForm: React.FC<BookCoursePaymentFormProps> = ({
  course,
  paymentSectionRef,
}) => {
  const { googleProfile, user } = useAuth();
  const { invoice, setInvoice } = useInvoice();

  const addNewCourseToInvoice = async () => {
    if (!invoice?.id) throw new Error("Error getting your invoice");
    // if course already on invoice, do nothing
    const existingLineItem = invoice.line_items.find(
      (item) => item.item_type === "course" && item.item_id === course.id
    );
    if (existingLineItem) return;
    const updatedInvoice = await ApiAdaptor.addCourseLineItem(invoice.id, {
      course_id: course.id,
    });
    setInvoice(updatedInvoice);
  };

  useEffect(() => {
    if (!invoice) return;
    addNewCourseToInvoice();
  }, [invoice]);

  if (!user) {
    return (
      <section>
        <div className="w-full text-center">
          <h2>It doesn't look like you're logged in</h2>
          <hr className="border-infos border-2" />
          <GoogleLogin
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
            buttonText="Login"
            render={(renderProps) => (
              <Image
                onClick={renderProps.onClick}
                layout="fill"
                src="/btn_google_signin_light_normal_web.png"
              />
            )}
            onSuccess={onSuccessCallback}
            onFailure={console.log}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
        </div>
      </section>
    );
  }
  return (
    <section className="H-48 z-50  w-full p-8" ref={paymentSectionRef}>
      <div className="w-full text-center">
        <h2 className="text-xl font-extrabold">Your order</h2>
      </div>
      <div className="m-auto w-3/6 p-4">
        <CheckoutScreen />
      </div>
    </section>
  );
};
