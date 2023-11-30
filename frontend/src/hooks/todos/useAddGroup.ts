import { useMutation } from "@tanstack/react-query";
import { addGroup } from "../../services/todos";
import { errorToast } from "../../lib/Toastify";

const useAddGroup = () => {
  const mutation = useMutation({
    mutationFn: addGroup,
    mutationKey: ["addGroup"],
    meta: {
      onError(error: Error) {
        errorToast(error.message);
      },
    },
  });

  return mutation;
};

export default useAddGroup;
