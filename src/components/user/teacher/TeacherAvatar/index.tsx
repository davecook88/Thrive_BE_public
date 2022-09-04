import React from "react";
import { TeacherAvatarProps } from "./styled";

export const TeacherAvatar: React.FC<TeacherAvatarProps> = ({ imageUrl }) => {
  if (!imageUrl) return null;
  return (
    <div className="avatar">
      <div className="w-24 h-24 rounded">
        <img src={imageUrl} />
      </div>
    </div>
  );
};
