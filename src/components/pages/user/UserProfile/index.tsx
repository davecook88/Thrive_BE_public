import React from "react";
import course from "../../../../pages/admin/course";
import { GenericCard } from "../../../common/cards/GenericCard";
import { PageContainer } from "../../../common/container/PageContainer/styled";
import { CourseCollapse } from "../../../course/CourseCollapse";
import { UserCard } from "../../../cards/UserCard";
import { PackageBookingsSection } from "./PackageBookingsSection";
import { UserProfileProps } from "./types";

export const UserProfilePage: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <PageContainer>
      <UserCard
        isStudent={!!user.student_id}
        isTeacher={!!user.teacher_id}
        userEmail={user.email}
        userName={user.user_name}
        isAdmin={user.admin}
      />
      <PackageBookingsSection packageBookings={user.package_bookings || []} />
      {user.studying_courses.length > 0 && (
        <GenericCard>
          <div className="w-full p-4 flex justify-center">
            <h2>Courses I'm studying</h2>
            {user.studying_courses.map((course) => (
              <CourseCollapse course={course} />
            ))}
          </div>
        </GenericCard>
      )}

      {user.teaching_courses.length > 0 && (
        <GenericCard className="w-full">
          <div className="w-full text-center">
            <h2 className="font-extrabold p-2">Courses I'm teaching</h2>
            {user.teaching_courses.map((course) => (
              <CourseCollapse course={course} />
            ))}
          </div>
        </GenericCard>
      )}
    </PageContainer>
  );
};
