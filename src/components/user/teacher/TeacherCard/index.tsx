import { useRouter } from "next/router";
import React from "react";
import tw from "tailwind-styled-components";
import { StandardButton } from "../../../styled/Buttons";
import { TeacherAvatar } from "../TeacherAvatar";
import { TeacherCardProps } from "./types";

const TeacherHeader = tw.header`
    flex
`;

export const TeacherCard: React.FC<TeacherCardProps> = ({
  teacher,
  showScheduleButton = true,
}) => {
  const router = useRouter();

  const redirectToTeacherPage = () => {
    router.push(`/teacher/${teacher.id}`);
  };

  return (
    <article className="rounded-sm shadow-sm p-6 border border-primary m-2 text-left relative flex flex-col justify-between">
      <div>
        <TeacherHeader>
          <TeacherAvatar imageUrl={teacher.photo_url} />
          <div className="p-4 w-full">
            <div className="my-1">
              <h5 className="font-extrabold text-2xl">
                {teacher.name || teacher.user_name}
              </h5>
            </div>
            <div className="my-1">
              <h6 className="font-bold">{teacher.subtitle}</h6>
            </div>
          </div>
        </TeacherHeader>
        <div className="justify-start	p-2">
          <p>{teacher.description}</p>
        </div>
      </div>
      {showScheduleButton && (
        <div className="flex p-4 justify-center">
          <StandardButton
            onClick={(e: { preventDefault: () => void }) => {
              e.preventDefault();
              redirectToTeacherPage();
            }}
            className="p-1 px-2 btn-primary"
          >
            See my schedule
          </StandardButton>
        </div>
      )}
    </article>
  );
};
