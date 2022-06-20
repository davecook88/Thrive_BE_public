import React, { Children } from "react";

interface CalendarMenuProps {
  children: React.ReactNode | React.ReactNode[];
}

const CalendarMenu: React.FC<CalendarMenuProps> = ({ children }) => {
  return <div className="w-full flex justify-around p-2">{children}</div>;
};

export default CalendarMenu;
