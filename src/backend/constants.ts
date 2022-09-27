export enum ApiEndpoints {
  verifyGoogleToken = "/auth/google",
  teacherAvailability = "/bookings/teacher-availability",
  payment = "/payment",
  paymentCreateIntent = "/payment/create-payment-intent",
  course = "/course",
  courseClass = "/course/class",
  teacher = "/teacher",
  teacherAdmin = "/admin/teacher",
  level = "/level",
  unit = "/level/unit",
  bookCourse = "/book/course",
  user = "/user",
  privateClass = "/private_class",
  invoice = "/invoice",
}

export class MissingTokenError extends Error {}
