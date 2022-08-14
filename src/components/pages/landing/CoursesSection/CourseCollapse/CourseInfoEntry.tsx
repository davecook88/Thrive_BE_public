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
      <span className="text-xs">{title}</span>
      <span>{value}</span>
    </div>
  );
};
