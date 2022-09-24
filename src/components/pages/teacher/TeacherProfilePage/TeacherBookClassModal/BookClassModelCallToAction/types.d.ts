import { PrivateClassPackageOption } from "../../../../../types/privateClass/responses";

export interface BookClassModelCallToActionProps {
  price: number;
  onBookNowClick: () => void;
  packageOptions: PrivateClassPackageOption[];
}
