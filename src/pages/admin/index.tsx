import React from "react";
import UnauthorizedAccessPage from "../../auth/UnauthorizedPage";
import { selectUser } from "../../components/redux/reducers/user/userSlice";
import AdminCourseSection from "../../components/admin/course/AdminCourseSection";
import { AdminLevelSection } from "../../components/admin/level/AdminLevelSection";
import { useAppSelector } from "../../components/redux/hooks";

const AdminPage = () => {
  const auth = useAppSelector(selectUser);
  if (!auth.user?.is_teacher) return <UnauthorizedAccessPage />;
  return (
    <div className=" p-4">
      <div id="admin-panel" className="grid w-full grid-cols-2 gap-4 p-2 ">
        <AdminCourseSection />
        <AdminLevelSection />
      </div>
    </div>
  );
};

export default AdminPage;
