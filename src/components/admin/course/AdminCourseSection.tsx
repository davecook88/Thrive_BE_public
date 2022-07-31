import Link from "next/link";
import React, { useEffect, useState } from "react";
import ApiAdaptor from "../../../backend/apiAdaptor";
import { DeleteButton } from "../../common/buttons/DeleteButton";
import { EditButton } from "../../common/buttons/EditButton";
import { Course } from "../../types/course/responses";

const AdminCourseSection = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    ApiAdaptor.listCourses({ page: 0 }).then(setCourses);
  }, []);

  const editCourse = (id: string) => {};

  const deleteCourse = (id: string) => {};

  const listCourses = () =>
    courses.map((course) => (
      <div className="p-1 " key={course.id}>
        <Link href={`/admin/course/${course.id}`}>
          <div
            id="row-container"
            className="flex justify-between align-center drop-shadow border border-base-600 bg-base-100 p-4 rounded-full hover:bg-base-300  cursor-pointer uppercase"
          >
            <div className="font-bold px-6">{course.name}</div>
            <div id="buttons-container" className="flex">
              <div>
                <DeleteButton clickHandler={() => deleteCourse(course.id)} />
              </div>
            </div>
          </div>
        </Link>
      </div>
    ));

  return (
    <div
      id="course-admin"
      className="border border-base-600 p-4 bg-base-100 rounded-lg drop-shadow"
    >
      <div className="w-full text-center">
        <h2 className="font-bold p-2 uppercase text-xl">Courses</h2>
      </div>
      <div id="courses-list-container">{listCourses()}</div>
      <div className="flex justify-center p-2 py-4">
        <Link href="/admin/course/">
          <div className="btn btn-accent">Create a course</div>
        </Link>
      </div>
    </div>
  );
};

export default AdminCourseSection;
