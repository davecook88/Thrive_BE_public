import { GoogleLoginResponse } from "react-google-login";
import ApiAdaptor from "../backend/apiAdaptor";
import { LOCAL_STORAGE_TOKEN_KEY } from "./constants";
import { GoogleProfile, ThriveUser } from "./types";

export const getTokenFromLocalStorage = () =>
  localStorage?.getItem(LOCAL_STORAGE_TOKEN_KEY);

export const saveTokenToLocalStorage = (token: string) =>
  localStorage?.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

export const deleteTokenFromLocalStorage = () =>
  localStorage?.removeItem(LOCAL_STORAGE_TOKEN_KEY);

export const GoogleSuccessfulAuthOnlineCallback = async (
  response: GoogleLoginResponse,
  callback?: (user: ThriveUser, googleProfile: GoogleProfile) => void
) => {
  const { googleId, profileObj, tokenId } = response;
  console.log({ profileObj }, JSON.stringify(profileObj));
  const thriveUser = await ApiAdaptor.verifyGoogleToken(
    tokenId,
    profileObj.email,
    googleId
  );

  if (callback) {
    callback(thriveUser, profileObj);
  }

  saveTokenToLocalStorage(tokenId);
};
