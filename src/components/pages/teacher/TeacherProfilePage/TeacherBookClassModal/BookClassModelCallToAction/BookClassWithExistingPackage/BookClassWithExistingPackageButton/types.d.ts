import { PrivateClassPackageBooking } from "../../../../../../../types/privateClass/responses";

export type BookClassWithExistingPackageButtonProps = {
  booking: PrivateClassPackageBooking;
  clickHandler: (booking: PrivateClassPackageBooking) => void;
};
