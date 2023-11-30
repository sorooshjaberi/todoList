import { useMutation } from "@tanstack/react-query";
import { addTodo } from "../../services/todos";
import { errorToast } from "../../lib/Toastify";

type Props = {};
const useAddTodo = () => {
  const mutation = useMutation({
    mutationFn: addTodo,
    mutationKey: ["createTodo"],
    meta: {
      onError(error: Error) {
        errorToast(error.message);
      },
    },
  });
  return mutation;
};

export default useAddTodo;
