import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import {
  ListTeachersResponse,
  TeacherResponse,
} from "../../components/types/teacher/responses";
import ApiAdaptor from "../../backend/apiAdaptor";
import { TeacherCard } from "../../components/user/teacher/TeacherCard";
import { TeacherProfilePage } from "../../components/pages/teacher/TeacherProfilePage";
import { useAppDispatch } from "../../components/redux/hooks";
import { setSelectedProfilePageTeacher } from "../../components/redux/reducers/teachers/TeacherProfilePageSlice/slice";
import { useTeacherProfile } from "../../hooks/useTeacherProfile";

interface TeacherPageProps {
  teacher: TeacherResponse;
}

const TeacherPage: React.FC<TeacherPageProps> = ({ teacher }) => {
  const { setTeacherProfile } = useTeacherProfile();
  setTeacherProfile(teacher);

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
