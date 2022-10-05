import React, { useState } from "react";
import Modal from "react-modal";
import { CourseCollapse } from "../../../course/CourseCollapse";
import { StandardButton } from "../../../styled/Buttons";
import { CourseMinimal } from "../../../types/course/responses";
import { LevelResponse } from "../../../types/level/response";

interface AllCoursesViewProps {
  focused: boolean;
  allCourses: CourseMinimal[];
  level: LevelResponse;
  showAllLevels: () => void;
}
export const AllCoursesView: React.FC<AllCoursesViewProps> = ({
  focused,
  allCourses,
  level,
  showAllLevels,
}) => {
  return (
    <Modal
      isOpen={focused}
      style={{
        content: {
          padding: "4px",
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "768px",
          height: "90%"
        },
      }}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between items-center bg-primary rounded-md p-3 text-center">
        <StandardButton
          onClick={showAllLevels}
          className="btn btn-info bg-neutral border-none text-base-100 hover:bg-neutral/90 py-0.5 text-xs"
        >
          Show all levels
        </StandardButton>{" "}
        <h2 className="card-title font-extrabold text-base-100 left-50 text-3xl sm:xl py-3">{`...${level.title}`}</h2>{" "}
        <button className="btn btn-accent" onClick={showAllLevels}>
          Close
        </button>
      </div>
      <div>
        <p className="p-4 text-center">{level.description}</p>

        {allCourses.map((c) => (
          <CourseCollapse course={c} showBookNowButton={true} />
        ))}
      </div>
    </Modal>
  );
};
