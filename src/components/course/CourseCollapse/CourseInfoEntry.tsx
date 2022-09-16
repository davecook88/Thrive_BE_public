import React from "react";

interface CourseInfoEntryProps {
  title: string;
  value: string;
}
export const CourseInfoEntry: React.FC<CourseInfoEntryProps> = ({
  title,
  value,
}) => {
  return (
    <div className="px-4">
      <span >{title}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
};
