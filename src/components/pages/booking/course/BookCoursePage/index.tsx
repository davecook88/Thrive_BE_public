import React, { useMemo, useState } from "react";
import { selectUser } from "../../../../../auth/userSlice";
import StripePayment from "../../../../payment/stripe/StripePayment";
import { useAppSelector } from "../../../../redux/hooks";
import { StandardButton } from "../../../../styled/Buttons";
import { Course } from "../../../../types/course/responses";
import { CourseDetails } from "./CourseDetails";
import { EnterStudentDetails } from "./EnterStudentDetails";
import { LiveClassScheduleSection } from "./LiveClassSchedule";
import { StudentDetailsSection } from "./StudentDetailsSection";

interface BookCoursePage {
  course: Course;
  levelCourses: Course[];
}

const BookCoursePage: React.FC<BookCoursePage> = ({ course, levelCourses }) => {
  const otherLevelCourses = useMemo(
    () => levelCourses.filter((l) => l.id !== course.id),
    [course.id, levelCourses]
  );
  const [showPaymentForm, setShowPaymentForm] = useState<boolean>(false);

  const { user, googleProfile } = useAppSelector(selectUser);

  return (
    <section>
      <div className="grid grid-cols-1">
        <div className="text-center text-xl ">
          <h2 className="text-center text-xl font-extrabold p-2">
            Course Details
          </h2>
          <div className="p-4">
            <CourseDetails course={course} />
          </div>
          <div>
            {user ? (
              <StudentDetailsSection user={user} />
            ) : (
              <EnterStudentDetails />
            )}
          </div>
        </div>
      </div>
      {!showPaymentForm && (
        <div className="w-full flex justify-center">
          <StandardButton onClick={() => setShowPaymentForm(true)}>
            Book Now
          </StandardButton>
        </div>
      )}
      {user?.details.email && showPaymentForm && (
        <StripePayment
          amount={course.price}
          course_id={course.id}
          course_name={course.name}
          currency="usd"
          user_google_id={user.details.google_id || ""}
          user_email={user.details.email}
          user_id={Number(user.details.id)}
          returnUrl={process.env.NEXT_PUBLIC_APP_BASE_URL + "/users/me"}
        />
      )}
      <LiveClassScheduleSection
        courseClasses={course.live_classes}
        otherLevelCourses={otherLevelCourses}
      />
    </section>
  );
};

export default BookCoursePage;
