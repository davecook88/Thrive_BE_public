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
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.75)",
        },
        content: {
          position: "absolute",
          top: "80px",
          left: "40px",
          right: "40px",
          bottom: "40px",
          border: "1px solid #ccc",
          background: "#fff",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
          padding: "20px",
        },
      }}
    >
      <div className="flex justify-between bg-primary rounded-md p-3 text-center">
        <StandardButton
          onClick={showAllLevels}
          className="btn btn-info bg-neutral border-none text-base-100 hover:bg-neutral/90 py-0.5 text-xs"
        >
          Show all levels
        </StandardButton>{" "}
        <h2 className="card-title font-extrabold text-base-100 left-50">{`...${level.title}`}</h2>{" "}
        <button className="btn btn-accent" onClick={showAllLevels}>
          Close
        </button>
      </div>
      <div>
        <p className="p-2 text-center">{level.description}</p>

        {allCourses.map((c) => (
          <CourseCollapse course={c} showBookNowButton={true} />
        ))}
      </div>
    </Modal>
  );
};
