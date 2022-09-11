import { User, UserProfile } from "../../../types/user/responses";

export type PaymentConfirmationPageComponentProps = {
  payment: {
    id: number;
    payment_date: Date;
    user_id: number;
    amount: number;
    payment_intent_id: string;
  };
  user: UserProfile;
  course: Course;
};
