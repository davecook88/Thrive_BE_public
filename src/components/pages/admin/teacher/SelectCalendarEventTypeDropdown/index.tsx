import React from "react";
import Dropdown from "../../../../common/forms/Dropdown";
import { BookingStatus } from "../../../../types/calendar/types";
import { SelectCalendarEventTypeDropdownProps } from "./types";

export const SelectCalendarEventTypeDropdown: React.FC<
  SelectCalendarEventTypeDropdownProps
> = ({ onEventTypeChange, selectedEventType }) => {
  const options: { displayName: string; eventType: BookingStatus }[] = [
    {
      displayName: "Available",
      eventType: "available",
    },
    {
      displayName: "Booked",
      eventType: "booked",
    },
  ];
  return (
    <Dropdown
      options={options.map((l) => ({
        name: l.displayName,
        id: l.eventType,
      }))}
      onChange={(id) => onEventTypeChange(id)}
      defaultOption="Select a unit"
      value={selectedEventType}
    />
  );
};
