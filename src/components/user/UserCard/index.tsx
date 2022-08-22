import React from "react";
import { GenericCard } from "../../common/cards/GenericCard";
import { UserCardProps } from "./types";

export const UserCard: React.FC<UserCardProps> = ({
  userEmail,
  userName,
  isTeacher,
  isStudent,
  isAdmin,
}) => {
  const badgeInfo = { admin: isAdmin, student: isStudent, teacher: isTeacher };
  const displayBadges = () =>
    Object.entries(badgeInfo)
      .filter(([key, val]) => val)
      .map((val) => <div className="badge badge-primary mx-2">{val}</div>);

  return (
    <GenericCard>
      <div>{displayBadges()}</div>
      <ul>
        <li>Name: {userName}</li>
        <li>Email: {userEmail}</li>
      </ul>
    </GenericCard>
  );
};
