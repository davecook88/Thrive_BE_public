import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ApiAdaptor from "../../../backend/apiAdaptor";
import { CourseClassForm } from "../../../components/admin/course/CourseClassForm";
import { DisplayClassList } from "../../../components/admin/course/CourseClassForm/DisplayClassList";
import CourseForm from "../../../components/admin/course/CourseForm";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../components/redux/hooks";
import {
  Course,
  CourseClassResponse,
} from "../../../components/types/course/responses";
import {
  selectAdmin,
  setSelectedCourse,
  setSelectedCourseClass,
} from "../../../components/admin/adminSlice";
import UnauthorizedAccessPage from "../../../auth/UnauthorizedPage";
import { selectUser } from "../../../components/redux/reducers/user/userSlice";

const EditCoursePage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const query = router.query;
  const _courseId = Array.isArray(query.courseId)
    ? query.courseId[0]
    : (query.courseId as string);

  const { selectedCourse: course, selectedCourseClass } =
    useAppSelector(selectAdmin);

  const setSelectedClass = (couseClass: CourseClassResponse) =>
    dispatch(setSelectedCourseClass({ selectedCourseClass: couseClass }));

  const setCourse = (course: Course) =>
    dispatch(setSelectedCourse({ selectedCourse: course }));

  useEffect(() => {
    refresh();
  }, [query]);

  const refresh = () => {
    if (!_courseId) return;
    ApiAdaptor.getCourseById(Number(_courseId)).then(setCourse);
  };

  useEffect(() => {
    const courseClassId = query.class;
    if (!courseClassId) return;

    // set selectedClass from path params
    const courseClass = course?.live_classes.find(
      (c) => c.id == Number(courseClassId)
    );
    if (!courseClass) return;
    setSelectedClass(courseClass);
  }, [course]);

  const auth = useAppSelector(selectUser);
  if (!auth.user?.is_teacher) return <UnauthorizedAccessPage />;
  if (!course) return "loading";
  return (
    <div className="artboard-demo">
      <div className="mb-4 flex w-full justify-center pt-4">
        <h1 className="text-3xl font-bold uppercase">Edit course</h1>
      </div>
      <CourseForm course={course} refresh={refresh} />
      <DisplayClassList courseClasses={course.live_classes} />
      <CourseClassForm
        course={course}
        classNumber={course?.live_classes ? course.live_classes.length + 1 : 1}
        courseClass={selectedCourseClass}
        refresh={refresh}
      />
    </div>
  );
};

export default EditCoursePage;
