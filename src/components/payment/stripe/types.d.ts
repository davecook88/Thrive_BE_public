export interface CreatePaymentIntentPayload {
  invoice_id: number;
  amount: number;
  currency: "usd";
  user_id: number;
  user_email: string;
  user_google_id: string;
}
