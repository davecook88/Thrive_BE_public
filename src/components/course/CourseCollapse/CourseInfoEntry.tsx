import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

interface CourseInfoEntryProps {
  title: string;
  value: string;
}
export const CourseInfoEntry: React.FC<CourseInfoEntryProps> = ({
  title,
  value,
}) => {
  return (
    <tr>
      <td>
        <FontAwesomeIcon icon={faClock} className="pr-2" />
      </td>
      <td>{title}</td>
      <td className="font-bold">{value}</td>
    </tr>
  );
};
