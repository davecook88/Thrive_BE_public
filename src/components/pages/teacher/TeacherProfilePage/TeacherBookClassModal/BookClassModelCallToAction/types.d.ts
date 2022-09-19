import { PrivateClassPackageOption } from "../../../../../types/privateClass/responses";

export interface BookClassModelCallToActionProps {
  startTime: Date;
  endTime: Date;
  price: number;
  onBookNowClick: () => void;
  packageOptions: PrivateClassPackageOption[];
}
