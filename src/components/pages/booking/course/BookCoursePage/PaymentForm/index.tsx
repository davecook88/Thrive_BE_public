import React from "react";
import GoogleLogin from "react-google-login";
import { useAuth } from "../../../../../../hooks/useAuth";
import { BookCoursePaymentFormProps } from "./types";
import Image from "next/image";
import { onSuccessCallback } from "../../../../../auth/utils";

export const BookCoursePaymentForm: React.FC<BookCoursePaymentFormProps> = ({
  course,
}) => {
  const { googleProfile, user } = useAuth();

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
  return <section></section>;
};
