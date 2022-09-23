import { PrivateClassOptionBase } from "./payloads";
import { Course } from "../course/responses";
import { Student } from "../student/response";
export interface PrivateClassOption extends PrivateClassOptionBase {
  id: number;
  cents_price: number;
  credits_price: number;
  description: string;
  id: number;
  length_minutes: number;
  name: string;
  package_options: PrivateClassPackageOption[];
  teacher_id: number;
}

export interface PrivateClassPackageOption {
  id: number;
  class_count: number;
  discount_percentage: number;
}

export interface PrivateClassPackageBooking {
  id: number;
  package: Package;
  total_classes: number;
  classes_booked: number;
  paid: boolean;
  active: boolean;
  payment_package_id: number;
  teacher_id: number;
}
export interface PrivateClassBookingResponse {
  course: Course;
  booking: PrivateClassPackageBooking;
}
