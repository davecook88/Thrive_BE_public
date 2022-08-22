import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { getTokenFromLocalStorage } from "../../auth/utils";
import ApiAdaptor from "../../backend/apiAdaptor";
import { PleaseLoginPage } from "../../components/pages/login/PleaseLoginPage";
import { UserProfilePage } from "../../components/pages/user/UserProfile";

const UserMePage = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    if (!getTokenFromLocalStorage()) return;
    ApiAdaptor.getUserMe().then(setUser);
  }, []);
  if (!user) return <PleaseLoginPage />;
  return <UserProfilePage user={user} />;
};

export default UserMePage;
