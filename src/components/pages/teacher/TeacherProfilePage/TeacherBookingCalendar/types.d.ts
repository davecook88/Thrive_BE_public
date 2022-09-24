import { PrivateClassOption } from "../../../../types/privateClass/responses";
import { Teacher } from "../../../../types/teacher";

export type TeacherBookingCalendarProps = {
  classLength: number;
  displayedDates: DisplayDatesType;
  setDisplayedDates: (displayedDates: DisplayDatesType) => void;
};
