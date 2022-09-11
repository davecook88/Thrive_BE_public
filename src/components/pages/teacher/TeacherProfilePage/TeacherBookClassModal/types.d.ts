import { PrivateClassOption } from "../../../../types/privateClass/responses";
import { ListTeachersResponse } from "../../../../types/teacher/responses";

export type TeacherBookClassModalProps = {
  availabilitySlot: AvailabilityStateEntry;
  teacher: ListTeachersResponse;
  privateClassOption?: PrivateClassOption;
};
