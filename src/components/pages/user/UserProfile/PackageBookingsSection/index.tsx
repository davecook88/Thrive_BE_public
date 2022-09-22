import React from "react";
import { PackageBookingCard } from "../../../../cards/PackageBookingCard";
import { PackageBookingsSectionProps } from "./types";

export const PackageBookingsSection: React.FC<PackageBookingsSectionProps> = ({
  packageBookings,
}) => {
  return (
    <div>
      <div>My Packages</div>
      {packageBookings.map((booking) => (
        <PackageBookingCard packageBooking={booking} />
      ))}
    </div>
  );
};
