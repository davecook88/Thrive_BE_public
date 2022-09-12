import { AvailabilityStateEntry } from "../../../../types/calendar/types";

const createCheckAgainstBookedSlots =
  (bookedSlots: AvailabilityStateEntry[]) => (start: number, end: number) => {
    /*
  Check one availability entry to see if it clashes with any booked slots
  */

    const clashingSlot = bookedSlots.find((slot) => {
      return slot.start >= start && slot.end <= end;
    });
    return Boolean(clashingSlot);
  };

export const splitAvailabilitySlots = (
  fullAvailability: AvailabilityStateEntry[],
  bookedSlots: AvailabilityStateEntry[],
  slotSizeMinutes: number = 60
) => {
  /*
    Users will select the length of class that they want to take and availability will
    be split into appropriate sized slots for selection
    */
  const slotLengthMilliseconds = slotSizeMinutes * 60 * 1000;
  const splitSlots: AvailabilityStateEntry[] = [];
  const checkClashingClasses = createCheckAgainstBookedSlots(bookedSlots);
  fullAvailability.forEach((availabilityEntry) => {
    let tempStartTime = availabilityEntry.start;
    let tempEndTime = availabilityEntry.start + slotLengthMilliseconds;
    while (tempEndTime <= availabilityEntry.end) {
      if (!checkClashingClasses(tempStartTime, tempEndTime)) {
        splitSlots.push({
          ...availabilityEntry,
          start: tempStartTime,
          end: tempEndTime,
        });
      } else {
        console.log("CLASH", new Date(tempStartTime), new Date(tempEndTime));
      }
      tempStartTime = tempEndTime;
      tempEndTime = tempStartTime + slotLengthMilliseconds;
    }
  });
  return splitSlots;
};
