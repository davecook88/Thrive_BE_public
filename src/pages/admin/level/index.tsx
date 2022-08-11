import React from "react";
import UnauthorizedAccessPage from "../../../auth/UnauthorizedPage";
import { selectUser } from "../../../auth/userSlice";
import LevelForm from "../../../components/admin/level/LevelForm";
import { useAppSelector } from "../../../components/redux/hooks";

const LevelAdminPage = () => {
  const auth = useAppSelector(selectUser);
  if (!auth.user?.is_teacher) return <UnauthorizedAccessPage />;
  return (
    <div className="artboard-demo">
      <div className="mb-4 w-full flex justify-center pt-4">
        <h1 className="font-bold uppercase text-3xl">Create a level</h1>
      </div>
      <LevelForm refresh={() => {}} />
    </div>
  );
};

export default LevelAdminPage;
