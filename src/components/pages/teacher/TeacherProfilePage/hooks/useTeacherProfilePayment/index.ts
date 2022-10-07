import ApiAdaptor from "../../../../../../backend/apiAdaptor";
import { useInvoice } from "../../../../../../hooks/useInvoice";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  selectTeacherPrivateClassBookings,
  setReadyForPayment,
} from "../../../../../redux/reducers/teacherPrivateClassBooking/teacherPrivateClassBookingSlice";
import {
  PrivateClassBookingResponse,
  PrivateClassPackageOption,
} from "../../../../../types/privateClass/responses";
import { usePrivateClassOption } from "../usePrivateClassOption";
import { useSelectedSlot } from "../useSelectedSlot";

export const useTeacherProfilePayment = () => {
  const dispatch = useAppDispatch();
  const { readyForPayment } = useAppSelector(selectTeacherPrivateClassBookings);
  const { selectedPrivateClassOption } = usePrivateClassOption();
  const { selectedAvailabilitySlotDates } = useSelectedSlot();
  const { invoice, setInvoice } = useInvoice();

  const addNewCourseToInvoice = async () => {
    if (!selectedPrivateClassOption)
      throw new Error("No selected private class option");
    if (!invoice?.id) throw new Error("No invoice selected");

    const newCourse = await ApiAdaptor.createPrivateClassCourse(
      selectedPrivateClassOption?.id,
      {
        minutes_duration: selectedPrivateClassOption?.length_minutes,
        max_students: 1,
        start_time: selectedAvailabilitySlotDates().start,
      }
    );
    const updatedInvoice = await ApiAdaptor.addCourseLineItem(invoice.id, {
      course_id: newCourse.id,
    });
    setInvoice(updatedInvoice);
  };

  const addNewPackageBookingToInvoice = async (
    packageOption: PrivateClassPackageOption
  ) => {
    if (!invoice?.id) throw new Error("No invoice selected");

    const bookingResponse: PrivateClassBookingResponse =
      await ApiAdaptor.createPrivateClassPackageBooking(packageOption.id, {
        classes: [{ start_time: selectedAvailabilitySlotDates().start }],
      });
    console.log({ bookingResponse });
    const updatedInvoice = await ApiAdaptor.addPackageBookingLineItem(
      invoice.id,
      { package_booking_id: bookingResponse.booking.id }
    );
    setInvoice(updatedInvoice);
  };

  const showPaymentScreen = () =>
    dispatch(setReadyForPayment({ readyForPayment: true }));

  const hidePaymentScreen = () =>
    dispatch(setReadyForPayment({ readyForPayment: false }));

  return {
    hidePaymentScreen,
    showPaymentScreen,
    readyForPayment,
    addNewCourseToInvoice,
    addNewPackageBookingToInvoice,
  };
};
