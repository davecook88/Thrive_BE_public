import React, { useEffect, useState } from "react";
import ApiAdaptor from "../../backend/apiAdaptor";
import AdminCourseSection from "../../components/admin/course/AdminCourseSection";
import { AdminLevelSection } from "../../components/admin/level/AdminLevelSection";
import { Course } from "../../components/types/course/responses";

const AdminPage = () => {
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
