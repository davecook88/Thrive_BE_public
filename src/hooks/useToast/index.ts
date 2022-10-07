import { showToast } from "../../components/common/alerts/toastSlice";
import { useAppDispatch } from "../../components/redux/hooks";

export const useToast = () => {
  const dispatch = useAppDispatch();
  const toast = ({ message }: { message: string }) =>
    dispatch(showToast({ message }));

  return {
    toast,
  };
};
