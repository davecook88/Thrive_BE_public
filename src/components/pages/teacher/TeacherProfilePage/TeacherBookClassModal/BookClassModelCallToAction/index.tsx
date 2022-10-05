import React, { useMemo } from "react";
import { StandardButton } from "../../../../../styled/Buttons";
import { getFormattedPrice } from "../utils";
import { BookClassModalPackageOptionButton } from "./BookClassModalPackageOptionButton";
import { BookClassModelCallToActionProps } from "./types";
import { useSelectedSlot } from "../../hooks/useSelectedSlot";
import { usePrivateClassOption } from "../../hooks/usePrivateClassOption";
import { usePackageBooking } from "../../hooks/usePackageBooking";
import { useTeacherProfilePayment } from "../../hooks/useTeacherProfilePayment";
import { PrivateClassPackageOption } from "../../../../../types/privateClass/responses";
import { BookClassWithExistingPackage } from "./BookClassWithExistingPackage";

export const BookClassModelCallToAction: React.FC<
  BookClassModelCallToActionProps
> = ({ price, packageOptions }) => {
  const { selectedAvailabilitySlotDates } = useSelectedSlot();
  const { showPaymentScreen, addNewPackageBookingToInvoice } =
    useTeacherProfilePayment();

  const onOrderPrivatePackage = async (
    packageOption: PrivateClassPackageOption
  ) => {
    // Set package option in redux
    // Create the inactive booking and add to invoice
    await addNewPackageBookingToInvoice(packageOption);
    showPaymentScreen();
  };

  const singleClassPackageOption = useMemo(
    () =>
      packageOptions.find(
        (packageOption) =>
          packageOption.class_count === 1 &&
          packageOption &&
          packageOption.active
      ),
    [packageOptions]
  );

  const multiClassPackageOptions = useMemo(
    () =>
      packageOptions.filter(
        (packageOption) => packageOption.class_count > 1 && packageOption.active
      ),
    [packageOptions]
  );

  return (
    <section>
      <div className="p-2">
        <table className="table table-compact w-full">
          <tbody>
            <tr>
              <td>Date</td>
              <td>
                {selectedAvailabilitySlotDates().start.toLocaleDateString()}
              </td>
            </tr>
            <tr>
              <td>Start Time</td>
              <td>
                {selectedAvailabilitySlotDates().start.toLocaleTimeString()}
              </td>
            </tr>
            <tr>
              <td>End Time</td>
              <td>
                {selectedAvailabilitySlotDates().end.toLocaleTimeString()}
              </td>
            </tr>
            <tr>
              <td>Price</td>
              <td>{getFormattedPrice(price)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-center">
        <BookClassWithExistingPackage />
      </div>
      {singleClassPackageOption && (
        <div className="w-full flex justify-center">
          <StandardButton
            className="btn-primary"
            onClick={() => onOrderPrivatePackage(singleClassPackageOption)}
          >
            Book now for {getFormattedPrice(price)}
          </StandardButton>
        </div>
      )}
      {multiClassPackageOptions.length > 0 && (
        <>
          <div className="font-bold w-full flex justify-center p-2">
            <h5>Or book a package to get a discount</h5>
          </div>
          <div>
            {multiClassPackageOptions.map((packageOption) => (
              <BookClassModalPackageOptionButton
                packageOption={packageOption}
                classPrice={price}
                key={packageOption.id}
                onClick={() => onOrderPrivatePackage(packageOption)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
