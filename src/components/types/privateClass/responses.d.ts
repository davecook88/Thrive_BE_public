import { PrivateClassOptionBase } from "./payloads";

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
