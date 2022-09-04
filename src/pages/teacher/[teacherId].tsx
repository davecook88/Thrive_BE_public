import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { ListTeachersResponse } from "../../components/types/teacher/responses";
import ApiAdaptor from "../../backend/apiAdaptor";
import { TeacherCard } from "../../components/user/teacher/TeacherCard";
import { TeacherProfilePage } from "../../components/pages/teacher/TeacherProfilePage";
import { useAppDispatch } from "../../components/redux/hooks";
import { setSelectedProfilePageTeacher } from "../../components/pages/teacher/TeacherProfilePage/TeacherProfilePageSlice/slice";

interface TeacherPageProps {
  teacher: ListTeachersResponse;
}

const TeacherPage: React.FC<TeacherPageProps> = ({ teacher }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setSelectedProfilePageTeacher({ teacher }));
  }, [teacher]);

  return <TeacherProfilePage teacher={teacher} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { teacherId } = context.query;
  const teacher = await ApiAdaptor.getTeacherById(Number(teacherId), {
    serverSide: true,
  });

  return {
    props: { teacher }, // will be passed to the page component as props
  };
};

export default TeacherPage;
