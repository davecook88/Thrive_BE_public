import clsx from "clsx";
import React, { useCallback } from "react";
import { GenericCard } from "../../common/cards/GenericCard";
import { StandardButton } from "../../styled/Buttons";
import { PackageBookingCardProps } from "./types";

export const PackageBookingCard: React.FC<PackageBookingCardProps> = ({
  packageBooking,
}) => {
  const active = packageBooking.active;
  const BookClassCallToActionButton = () => (
    <StandardButton>Book a class</StandardButton>
  );
  const TopupCallToActionButton = () => (
    <StandardButton>Top up package</StandardButton>
  );

  const CallToAction = useCallback(() => {
    if (active) {
      return BookClassCallToActionButton();
    }
    return TopupCallToActionButton();
  }, [active]);
  const badgeInfo = { active, inactive: !active };

  const displayBadges = () =>
    Object.entries(badgeInfo)
      .filter(([key, val]) => val)
      .map((val) => (
        <div
          className={clsx([
            "badge",
            active ? "badge-primary" : "badge-warning",
            "mx-2",
          ])}
        >
          {val}
        </div>
      ));

  return (
    <GenericCard className={clsx(active ? "" : "bg-neutral")}>
      <div>{displayBadges()}</div>
      <div>{packageBooking.package.name}</div>
      <div>paid: {String(packageBooking.paid)}</div>
      <div>
        Classes booked:
        {`${packageBooking.classes_booked} / ${packageBooking.total_classes}`}
      </div>
      <div className="w-full flex justify-center">{CallToAction()}</div>
    </GenericCard>
  );
};
