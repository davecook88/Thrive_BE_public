import React from "react";
import { GetServerSideProps } from "next";
import ApiAdaptor from "../../backend/apiAdaptor";
import { ListTeachersResponse } from "../../components/types/teacher/responses";
import { TeacherCard } from "../../components/user/teacher/TeacherCard";

interface ListTeacherPage {
  teachers: ListTeachersResponse[];
}

const ListTeacherPage: React.FC<ListTeacherPage> = ({ teachers }) => {
  return (
    <section className="container">
      <div className="flex justify-center p-6">
        <h1 className="font-extrabold text-4xl">The Thrive in Spanish team</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 ">
        {teachers.map((teacher) => (
          <TeacherCard teacher={teacher} />
        ))}
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const teachers = await ApiAdaptor.listTeachers({
    serverSide: true,
  });
  if (!teachers) return { notFound: true };

  return {
    props: { teachers }, // will be passed to the page component as props
  };
};

export default ListTeacherPage;
