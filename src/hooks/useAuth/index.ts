import { selectUser } from "../../components/redux/reducers/user/userSlice";
import { useAppSelector } from "../../components/redux/hooks";

export const useAuth = () => {
  const auth = useAppSelector(selectUser);

  return { ...auth };
};
