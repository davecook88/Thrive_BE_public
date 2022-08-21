import React from "react";
import Image from "next/image";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { GoogleSuccessfulAuthOnlineCallback } from "../../../../../auth/utils";
import { useAppDispatch } from "../../../../redux/hooks";
import { setUser } from "../../../../../auth/userSlice";

export const EnterStudentDetails = () => {
  const dispatch = useAppDispatch();

  const responseIsGoogleLoginResponse = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): response is GoogleLoginResponse => Object.hasOwn(response, "googleId");
  const onSuccessCallback = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if (!responseIsGoogleLoginResponse(response)) return;
    GoogleSuccessfulAuthOnlineCallback(response, (user, googleProfile) => {
      dispatch(setUser({ user, googleProfile }));
    });
  };

  return (
    <div>
      <h3 className="font-bold">Enter your details</h3>
      <div>Sign in with your Google account or create one here:</div>
      <div className="relative h-16 p-2">
        <div className="w-48 h-full relative m-auto cursor-pointer">
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
      </div>
    </div>
  );
};
