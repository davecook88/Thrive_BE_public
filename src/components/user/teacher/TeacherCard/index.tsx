import React from "react";
import tw from "tailwind-styled-components";
import { StandardButton } from "../../../styled/Buttons";
import { TeacherCardProps } from "./types";

const TeacherHeader = tw.header`
    flex
`;

export const TeacherCard: React.FC<TeacherCardProps> = ({
  teacher,
  showScheduleButton = true,
}) => {
  return (
    <article className="rounded-sm shadow-sm p-6 border border-primary m-2 text-left relative flex flex-col justify-between">
      <div>
        <TeacherHeader>
          <div className="avatar">
            <div className="w-24 h-24 rounded">
              <img src={teacher.photo_url} />
            </div>
          </div>
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
          <StandardButton className="p-1 px-2 btn-primary">
            See my schedule
          </StandardButton>
        </div>
      )}
    </article>
  );
};
