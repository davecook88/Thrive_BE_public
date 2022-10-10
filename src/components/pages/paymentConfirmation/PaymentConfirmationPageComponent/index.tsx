import React from "react";
import tw from "tailwind-styled-components";
import { selectUser } from "../../../redux/reducers/user/userSlice";
import { selectAdmin } from "../../../admin/adminSlice";
import { ClassScheduleTable } from "../../../course/ClassScheduleTable";
import { useAppSelector } from "../../../redux/hooks";
import { StandardButton } from "../../../styled/Buttons";
import { PaymentConfirmationPageComponentProps } from "./types";

const ParagraphElement = tw.p`
    leading-6
    p-2
`;

export const PaymentConfirmationPageComponent: React.FC<
  PaymentConfirmationPageComponentProps
> = ({ course, payment }) => {
  const admin = useAppSelector(selectUser);
  return (
    <div className="container">
      <div className="m-4 flex w-full justify-center">
        <h1 className="text-3xl font-extrabold ">Thank you for your payment</h1>
      </div>

      <div className="card flex justify-center rounded-sm border-2 border-primary p-6 shadow">
        <ParagraphElement>
          Thank you for your booking, {admin.googleProfile?.givenName}.
        </ParagraphElement>
        <ParagraphElement>
          You have booked the {course.name} course.
        </ParagraphElement>
        <ParagraphElement>
          All of your course materials and class times can be found on Google
          Classrooms. You should have already received an invitation to join the
          group.
        </ParagraphElement>
        <div className="flex justify-center p-4">
          <StandardButton>
            <a href="https://classroom.google.com/" target="_blank">
              See on Google Classrooms
            </a>
          </StandardButton>
        </div>
        <ParagraphElement>
          All of your course materials and class times can be found on Google
          Classrooms. You should have already received an invitation to join the
          group.
        </ParagraphElement>
        <ParagraphElement>
          If you haven't received an invitation to Google Classroom or if you
          have any questions, please feel free to{" "}
          <a
            className="font-bold text-primary hover:text-info"
            href="mailto:contact@lakarencita.com"
          >
            get in touch
          </a>
          .
        </ParagraphElement>
      </div>
      <div className="p-2 md:p-6">
        <div className="flex justify-center p-2">
          <h1 className="text-2xl font-extrabold ">Your live class schedule</h1>
        </div>
        <div className="flex justify-center p-2">
          <ParagraphElement>
            These classes should automatically have been added to your Google
            Calendar.{" "}
            <a
              href="https://calendar.google.com"
              className="font-bold text-primary hover:text-info"
            >
              Click here
            </a>{" "}
            to check.
          </ParagraphElement>
        </div>
        <ClassScheduleTable courseClasses={course.live_classes} />
      </div>
    </div>
  );
};
