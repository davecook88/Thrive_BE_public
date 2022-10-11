import React from "react";
import Link from "next/link";
import { useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/reducers/user/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import GoogleLogoutButton from "../../../auth/google/LogoutButton";
import GoogleLoginButton from "../../../auth/google/LoginButton";
import Toggle from "../../../toggle";
import { IconHolder } from "./styled";

const Navigation = () => {
  const auth = useAppSelector(selectUser);
  return (
    <>
      {/* <div className="ml-10 flex items-baseline space-x-4 gap-4"> */}

      <div className="md:block lg:flex lg:gap-8">
        <div className="py-2 text-lg text-primary">
          <Link href="/">
            <a>
              <IconHolder>
                <FontAwesomeIcon icon={faHouse} />
              </IconHolder>
            </a>
          </Link>
        </div>
        <div className="py-2 text-lg text-primary">
          <Link href="/order">
            <a>
              <IconHolder>
                <FontAwesomeIcon icon={faShoppingCart} />
              </IconHolder>{" "}
            </a>
          </Link>
        </div>
        {auth.user?.is_teacher && (
          <div className="py-2  text-lg text-primary">
            <Link href="/admin">
              <a>Admin</a>
            </Link>
          </div>
        )}

        <div className="py-2  text-lg text-primary">
          {auth.user ? <GoogleLogoutButton /> : <GoogleLoginButton />}
        </div>
        <div className="avatar">
          {auth.googleProfile?.imageUrl && (
            <Link href="/user/me">
              <div className="mask mask-circle w-8">
                <img
                  src={auth.googleProfile?.imageUrl}
                  referrerPolicy="no-referrer"
                />
              </div>
            </Link>
          )}
        </div>

        <div className="place-self-center border-gray-100 py-2 lg:border-0">
          <Toggle />
        </div>
      </div>
    </>
  );
};

export default Navigation;
