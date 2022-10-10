import React from "react";
import UnauthorizedAccessPage from "../../../auth/UnauthorizedPage";
import LevelForm from "../../../components/admin/level/LevelForm";
import { useAppSelector } from "../../../components/redux/hooks";
import { selectUser } from "../../../components/redux/reducers/user/userSlice";

const LevelAdminPage = () => {
  const auth = useAppSelector(selectUser);
  if (!auth.user?.is_teacher) return <UnauthorizedAccessPage />;
  return (
    <div className="artboard-demo">
      <div className="mb-4 flex w-full justify-center pt-4">
        <h1 className="text-3xl font-bold uppercase">Create a level</h1>
      </div>
      <LevelForm refresh={() => {}} />
    </div>
  );
};

export default LevelAdminPage;
