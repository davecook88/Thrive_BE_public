import {
  PrivateClassBooking,
  PrivateClassPackageBooking,
  PrivateClassOption,
  PrivateClassPackageOption,
} from "../../../types/privateClass/responses";
import { DisplayDatesType } from "../../../scheduling/BigBookingCalendar/types";

import { AvailabilityCalendarEvent } from "../../../scheduling/BigBookingCalendar/types";

export type TeacherPrivateClassBookingsState = {
  readyForPayment: boolean;
  packageBookings: PrivateClassBooking[];
  activePackageBookings: PrivateClassBooking[];
  calendarDisplayedDates: DisplayDatesSerializableType;
  selectedPrivateClassOption: PrivateClassOption | null;
  selectedAvailabilitySlot: AvailabilityCalendarEvent | null;
  selectedPrivateClassPackage: PrivateClassPackageOption | null;
  packageBookingToApply: PrivateClassPackageBooking | null;
};

export type SetPackageBookingsAction = {
  packageBookings: PrivateClassPackageBooking[];
};

export interface DisplayDatesSerializableType {
  start: string;
  end: string;
}

export type SetReadyForPaymentAction = {
  readyForPayment: boolean;
};

export type SetPrivateClassCalendarDisplayedDatesAction = {
  displayedDates: DisplayDatesSerializableType;
};

export type SetPrivateClassOptionAction = {
  privateClassOption: PrivateClassOption;
};

export type SetPrivateClassPackageOptionAction = {
  packageOption: PrivateClassPackageOption;
};

export type SetSelectedAvailabilitySlotAction = {
  selectedAvailabilitySlot: AvailabilityCalendarEvent;
};

export type SetActiveBookingToApplyAction = {
  booking: PrivateClassPackageBooking | null;
};
