import { User } from "../user/responses";

export interface ListTeachersResponse extends User {
  id: number;
  course_id: number;
  email: string;
}
