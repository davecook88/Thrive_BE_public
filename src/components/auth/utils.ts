import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { setUser } from "../redux/reducers/user/userSlice";
import { GoogleSuccessfulAuthOnlineCallback } from "../../auth/utils";
import { useAppDispatch } from "../redux/hooks";

export const responseIsGoogleLoginResponse = (
  response: GoogleLoginResponse | GoogleLoginResponseOffline
): response is GoogleLoginResponse => "googleId" in response;

export const onSuccessCallback = (
  response: GoogleLoginResponse | GoogleLoginResponseOffline
) => {
  const dispatch = useAppDispatch();
  if (!responseIsGoogleLoginResponse(response)) return;
  GoogleSuccessfulAuthOnlineCallback(response, (user, googleProfile) => {
    dispatch(setUser({ user, googleProfile }));
  });
};
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
