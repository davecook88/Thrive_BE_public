import React from "react";
import { StandardButton } from "../../../../../styled/Buttons";
import { getFormattedPrice } from "../utils";
import { BookClassModalPackageOptionButton } from "./BookClassModalPackageOptionButton";
import { BookClassModelCallToActionProps } from "./types";
import { useSelectedSlot } from "../../hooks/useSelectedSlot";
import { usePrivateClassOption } from "../../hooks/usePrivateClassOption";
import { usePackageBooking } from "../../hooks/usePackageBooking";

export const BookClassModelCallToAction: React.FC<
  BookClassModelCallToActionProps
> = ({ price, onBookNowClick, packageOptions }) => {
  const { setSelectedPrivateClassPackage } = usePrivateClassOption();
  const { applicableBookings } = usePackageBooking();
  const { selectedAvailabilitySlotDates } = useSelectedSlot();

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

      </div>
      <div className="w-full flex justify-center">
        <StandardButton
          className="btn-primary"
          onClick={() => onBookNowClick()}
        >
          Book now for {getFormattedPrice(price)}
        </StandardButton>
      </div>

      <div className="font-bold w-full flex justify-center p-2">
        <h5>Or book a package to get a discount</h5>
      </div>
      <div>
        {packageOptions.map((packageOption) => (
          <BookClassModalPackageOptionButton
            packageOption={packageOption}
            classPrice={price}
            key={packageOption.id}
            onClick={() => {
              setSelectedPrivateClassPackage(packageOption);
              onBookNowClick();
            }}
          />
        ))}
      </div>
    </section>
  );
};
