import React, { useEffect, useState } from "react";
import ApiAdaptor from "../../backend/apiAdaptor";
import AdminCourseSection from "../../components/admin/course/AdminCourseSection";
import { Course } from "../../components/types/course/responses";

const AdminPage = () => {
  return (
    <div className=" p-4">
      <div id="admin-panel" className="grid grid-cols-2 p-2 gap-4 w-full ">
        <AdminCourseSection />
      </div>
    </div>
  );
};

export default AdminPage;
