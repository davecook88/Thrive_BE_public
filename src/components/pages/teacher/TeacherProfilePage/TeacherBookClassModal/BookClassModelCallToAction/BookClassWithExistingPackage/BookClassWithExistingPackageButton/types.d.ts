import { PrivateClassPackageBooking } from "../../../../../../../types/privateClass/responses";

export type BookClassWithExistingPackageButtonProps = {
  booking: PrivateClassBookingResponse;
  clickHandler: (booking: PrivateClassPackageBooking) => void;
};
