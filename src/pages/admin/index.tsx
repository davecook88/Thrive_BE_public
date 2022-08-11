import React, { useEffect, useState } from "react";
import UnauthorizedAccessPage from "../../auth/UnauthorizedPage";
import { selectUser } from "../../auth/userSlice";
import ApiAdaptor from "../../backend/apiAdaptor";
import AdminCourseSection from "../../components/admin/course/AdminCourseSection";
import { AdminLevelSection } from "../../components/admin/level/AdminLevelSection";
import { useAppSelector } from "../../components/redux/hooks";
import { Course } from "../../components/types/course/responses";

const AdminPage = () => {
  const auth = useAppSelector(selectUser);
  if (!auth.user?.is_teacher) return <UnauthorizedAccessPage />;
  return (
    <div className=" p-4">
      <div id="admin-panel" className="grid grid-cols-2 p-2 gap-4 w-full ">
        <AdminCourseSection />
        <AdminLevelSection />
      </div>
    </div>
  );
};

export default AdminPage;
