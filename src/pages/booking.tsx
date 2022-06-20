import BigBookingCalendar from "../components/scheduling/BigBookingCalendar";
import BookingCalendar from "../components/BookingCalendar";
import EditAvailabilityForm from "../components/scheduling/availability/edit";

const BookingPage = () => {
  return (
    <div>
      <BigBookingCalendar height="800px" defaultView="week" />
    </div>
  );
};

export default BookingPage;
