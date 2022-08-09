import React from "react";
import LevelForm from "../../../components/admin/level/LevelForm";

const LevelAdminPage = () => {
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
