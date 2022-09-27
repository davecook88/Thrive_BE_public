import ApiAdaptor from "../../../../backend/apiAdaptor";
import { getDefaultDisplayDates } from "../../../scheduling/BigBookingCalendar/utils";
import { PrivateClassPackageBooking } from "../../../types/privateClass/responses";

export const fetchAllPackageBookings = async (activeOnly: boolean) => {
  const bookings: PrivateClassPackageBooking[] = [];
  let finished = false;
  let page = 1;
  while (!finished) {
    const response = await ApiAdaptor.listPrivatePackageBookings({
      page,
      active_only: activeOnly,
    });
    if (Array.isArray(response) && response.length > 0) {
      bookings.concat(response);
      page++;
    } else {
      finished = true;
    }
  }
  return { bookings, activeOnly };
};

export const getSerializableDisplayDates = () => {
  const dates = getDefaultDisplayDates();
  return {
    start: dates.start.toISOString(),
    end: dates.end.toISOString(),
  };
};
