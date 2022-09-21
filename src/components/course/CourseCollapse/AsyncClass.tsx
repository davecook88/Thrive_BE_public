import React from "react";

interface AsyncClassProps {
  course: object;
}
export const AsyncClass: React.FC<AsyncClassProps> = ({ course }) => {
  return <div className="flex p-2">Async Class Info</div>;
};
