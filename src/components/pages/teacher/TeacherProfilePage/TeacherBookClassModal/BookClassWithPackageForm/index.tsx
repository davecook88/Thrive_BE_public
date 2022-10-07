import React from "react";
import { PackageBookingCard } from "../../../../../cards/PackageBookingCard";
import { StandardButton } from "../../../../../styled/Buttons";
import { usePackageBooking } from "../../hooks/usePackageBooking";
import { useSelectedSlot } from "../../hooks/useSelectedSlot";
import { BookClassWithPackageFormProps } from "./types";

export const BookClassWithPackageForm: React.FC<
  BookClassWithPackageFormProps
> = () => {
  const { packageBookingToApply, usePackageToBookClass } = usePackageBooking();
  const { selectedAvailabilitySlotDates } = useSelectedSlot();
  return (
    <div>
      <div className="text-center p-4">
        Are you sure you want to use this package to book a class?
      </div>
      <PackageBookingCard packageBooking={packageBookingToApply} />
      <div>
        <table>
          <tbody>
            <tr>
              <td>Start Time:</td>
              <td>{selectedAvailabilitySlotDates().start.toLocaleString()}</td>
            </tr>
            <tr>
              <td>End Time:</td>
              <td>{selectedAvailabilitySlotDates().end.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-center">
        <StandardButton
          onClick={() =>
            usePackageToBookClass(selectedAvailabilitySlotDates().start)
          }
        >
          Book Class Using Package
        </StandardButton>
      </div>
    </div>
  );
};
