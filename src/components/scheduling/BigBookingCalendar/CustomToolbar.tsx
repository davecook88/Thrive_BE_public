import React from "react";
import { ToolbarProps } from "react-big-calendar";
import { AvailabilityCalendarEvent } from "./types";

export const CustomToolbar = (
  toolbar: React.PropsWithChildren<
    ToolbarProps<AvailabilityCalendarEvent, object>
  >
) => {
  return <div className="w-full flex justify-center">Custom Toolbar</div>;
};
