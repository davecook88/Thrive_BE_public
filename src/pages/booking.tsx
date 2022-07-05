import BigBookingCalendar from "../components/scheduling/BigBookingCalendar";
import BookingCalendar from "../components/BookingCalendar";
import EditAvailabilityForm from "../components/scheduling/availability/edit";
import { useAppSelector } from "../components/redux/hooks";
import { selectUser } from "../auth/userSlice";
import LoggedOutError from "../components/auth/LoggedOutMessage";

const BookingPage = () => {
  const auth = useAppSelector(selectUser);
  if (!auth?.user?.is_teacher) return <LoggedOutError />;
  return (
    <div>
      <BigBookingCalendar height="800px" defaultView="week" />
    </div>
  );
};

export default BookingPage;
