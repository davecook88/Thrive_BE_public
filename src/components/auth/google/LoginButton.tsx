import React from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { setUser } from "../../../auth/userSlice";
import { GoogleSuccessfulAuthOnlineCallback } from "../../../auth/utils";
import { useAppDispatch } from "../../redux/hooks";

interface GoogleLoginButtonProps {
  className?: string;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ className }) => {
  if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
    throw new Error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set");
  }
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
    <GoogleLogin
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
      buttonText="Login"
      render={(renderProps) => (
        <button
          className={className}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          Login
        </button>
      )}
      onSuccess={onSuccessCallback}
      onFailure={console.log}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
    />
  );
};

export default GoogleLoginButton;
