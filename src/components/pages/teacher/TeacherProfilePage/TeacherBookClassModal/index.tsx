import React, { useMemo } from "react";
import { TeacherBookClassModalProps } from "./types";
import moment from "moment";
import { TeacherAvatar } from "../../../../user/teacher/TeacherAvatar";
export const TeacherBookClassModal: React.FC<TeacherBookClassModalProps> = ({
  teacher,
  availabilitySlot,
}) => {
  const times = useMemo(
    () => ({
      start: new Date(availabilitySlot.start),
      end: new Date(availabilitySlot.end),
    }),
    [availabilitySlot]
  );

  return (
    <div className="p-6">
      <div>
        <div className="w-full flex justify-between p-2">
          <TeacherAvatar imageUrl={teacher.photo_url} />
          <div className="px-2">
            <h2 className="text-lg font-bold">
              Book a class with {teacher.name}
            </h2>
          </div>
        </div>
        <div className="p-2">
          <table className="table table-compact w-full">
            <tr>
              <td>Date</td>
              <td>{times.start.toLocaleDateString()}</td>
            </tr>
            <tr>
              <td>Start Time</td>
              <td>{times.start.toLocaleTimeString()}</td>
            </tr>
            <tr>
              <td>End Time</td>
              <td>{times.end.toLocaleTimeString()}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};
