import React from "react";
import {
  GoogleLogout,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { clearUser } from "../../../auth/userSlice";
import {
  deleteTokenFromLocalStorage,
  GoogleSuccessfulAuthOnlineCallback,
} from "../../../auth/utils";
import ApiAdaptor from "../../../backend/apiAdaptor";
import { useAppDispatch } from "../../redux/hooks";

const responseIsGoogleLoginResponse = (
  response: GoogleLoginResponse | GoogleLoginResponseOffline
): response is GoogleLoginResponse => "googleId" in response;
const onSuccessCallback = (
  response: GoogleLoginResponse | GoogleLoginResponseOffline
) => {
  if (!responseIsGoogleLoginResponse(response)) return;
  GoogleSuccessfulAuthOnlineCallback(response);
};

interface GoogleLoginButtonProps {
  className?: string;
}

const GoogleLogoutButton: React.FC<GoogleLoginButtonProps> = ({
  className,
}) => {
  if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
    throw new Error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set");
  }
  const dispatch = useAppDispatch();
  const onLogoutSuccess = () => {
    dispatch(clearUser());
    deleteTokenFromLocalStorage();
  };
  return (
    <GoogleLogout
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
      buttonText="Logout"
      render={(renderProps) => (
        <button
          className={className}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          Logout
        </button>
      )}
      onFailure={console.log}
      onLogoutSuccess={onLogoutSuccess}
    />
  );
};

export default GoogleLogoutButton;
