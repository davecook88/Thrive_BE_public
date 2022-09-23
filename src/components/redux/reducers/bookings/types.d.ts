import { PrivateClassBooking } from "../../../types/privateClass/responses";
export type BookingsState = {
  packageBookings: PrivateClassBooking[];
  activePackageBookings: PrivateClassBooking[];
};

export type SetPackageBookingsAction = {
  packageBookings: PrivateClassBooking[];
};
