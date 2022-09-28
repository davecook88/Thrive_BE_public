import { selectUser } from "../../auth/userSlice";
import { useAppSelector } from "../../components/redux/hooks";

export const useAuth = () => {
  const auth = useAppSelector(selectUser);

  return { ...auth };
};
