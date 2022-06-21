import React from "react";
import Toggle from "../../toggle";
import GithubIcon from "../../icons/github";
import Link from "next/link";
import GoogleLoginButton from "../../auth/google/LoginButton";
import { selectUser } from "../../../auth/userSlice";
import GoogleLogoutButton from "../../auth/google/LogoutButton";
import { useAppSelector } from "../../redux/hooks";

const Navigation = () => {
  const auth = useAppSelector(selectUser);
  return (
    <>
      {/* <div className="ml-10 flex items-baseline space-x-4 gap-4"> */}

      <div className="md:block lg:flex lg:gap-8 ">
        <div className="py-2 border-b-2 border-opacity-10 border-gray-100	lg:border-0">
          <Link href="/">
            <a className="dark:text-skin-white">Home</a>
          </Link>
        </div>

        <div className="py-2 border-b-2 border-opacity-10 border-gray-100	lg:border-0">
          {auth.user ? (
            <GoogleLogoutButton />
          ) : (
            <GoogleLoginButton className="dark:text-skin-white" />
          )}
        </div>

        <div className="place-self-center py-2 border-gray-100 lg:border-0">
          <Toggle />
        </div>
      </div>
    </>
  );
};

export default Navigation;
