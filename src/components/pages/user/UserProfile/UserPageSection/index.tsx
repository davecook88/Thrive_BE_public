import React from "react";
import { UserPageSectionProps } from "./types";

export const UserPageSection: React.FC<UserPageSectionProps> = ({
  title,
  children,
}) => {
  return (
    <section>
      <div className="w-full flex justify-center text-center">
        <h3>{title}</h3>
      </div>
      <div>{children}</div>
    </section>
  );
};
