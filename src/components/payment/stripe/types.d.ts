export type PaymentIntentCategory =
  | "COURSE_BOOKING"
  | "PACKAGE_BOOKING"
  | "PACKAGE_EXTENSION";

export interface CreatePaymentIntentPayload {
  category: PaymentIntentCategory;
  amount: number;
  currency: "usd";
  course_id: number;
  user_id: number;
  user_email: string;
  course_name: string;
  user_google_id: string;
  package_id?: number;
}
