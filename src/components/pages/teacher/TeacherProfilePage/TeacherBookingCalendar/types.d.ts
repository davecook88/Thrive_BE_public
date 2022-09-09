import { PrivateClassOption } from "../../../../types/privateClass/responses";

export type TeacherBookingCalendarProps = {
  availabilityEntries: AvailabilityStateEntry[];
  teacherId: number;
  classLength: number;
  selectedPrivateClass?: PrivateClassOption;
};
