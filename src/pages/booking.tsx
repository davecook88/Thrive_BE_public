import BigBookingCalendar from "../components/scheduling/BigBookingCalendar";
import BookingCalendar from "../components/BookingCalendar";
import EditAvailabilityForm from "../components/scheduling/availability/edit";

const BookingPage = () => {
  return (
    <div>
      <EditAvailabilityForm />
      <BigBookingCalendar height="400px" />
    </div>
  );
};

export default BookingPage;
