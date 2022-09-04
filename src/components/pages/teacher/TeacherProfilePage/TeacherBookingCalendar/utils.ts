import { AvailabilityStateEntry } from "../../../../types/calendar/types";

export const splitAvailabilitySlots = (
  fullAvailability: AvailabilityStateEntry[],
  slotSizeMinutes: number = 60
) => {
  /*
    Users will select the length of class that they want to take and availability will
    be split into appropriate sized slots for selection
    */
  const slotLengthMilliseconds = slotSizeMinutes * 60 * 1000;
  const splitSlots: AvailabilityStateEntry[] = [];
  fullAvailability.forEach((availabilityEntry) => {
    let tempStartTime = availabilityEntry.start;
    let tempEndTime = availabilityEntry.start + slotLengthMilliseconds;
    while (tempEndTime < availabilityEntry.end) {
      splitSlots.push({
        ...availabilityEntry,
        start: tempStartTime,
        end: tempEndTime,
      });
      tempStartTime = tempEndTime;
      tempEndTime = tempStartTime + slotLengthMilliseconds;
    }
  });
  return splitSlots;
};
