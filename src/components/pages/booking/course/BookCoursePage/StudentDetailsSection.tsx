import React from "react";
import { GoogleLogout } from "react-google-login";
import { ThriveUser } from "../../../../../auth/types";
import { clearUser } from "../../../../../auth/userSlice";
import { deleteTokenFromLocalStorage } from "../../../../../auth/utils";
import { useAppDispatch } from "../../../../redux/hooks";
import { StandardButton } from "../../../../styled/Buttons";

interface StudentDetailsSection {
  user: ThriveUser;
}

export const StudentDetailsSection: React.FC<StudentDetailsSection> = ({
  user,
}) => {
  const dispatch = useAppDispatch();
  const onLogoutSuccess = () => {
    dispatch(clearUser());
    deleteTokenFromLocalStorage();
  };
  return (
    <div className="p-4">
      <h3>Your details</h3>
      <ul>
        <li>Name: {user.details.name}</li>
        <li>Email: {user.details.email}</li>
      </ul>
      <div className="flex justify-between">
        <GoogleLogout
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
          buttonText="Logout"
          render={(renderProps) => (
            <StandardButton
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="btn-error"
            >
              Clear details
            </StandardButton>
          )}
          onFailure={console.log}
          onLogoutSuccess={onLogoutSuccess}
        />
        <StandardButton className="btn-info text-base-100">
          Continue
        </StandardButton>
      </div>
    </div>
  );
};
