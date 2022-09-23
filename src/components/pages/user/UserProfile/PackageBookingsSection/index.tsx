import React from "react";
import { PackageBookingCard } from "../../../../cards/PackageBookingCard";
import { UserPageSection } from "../UserPageSection";
import { PackageBookingsSectionProps } from "./types";

export const PackageBookingsSection: React.FC<PackageBookingsSectionProps> = ({
  packageBookings,
}) => {
  return (
    <UserPageSection title="My packages">
      {packageBookings.map((booking) => (
        <PackageBookingCard packageBooking={booking} />
      ))}
    </UserPageSection>
  );
};
