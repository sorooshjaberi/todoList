import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTodo } from "../../services/todos";

const useEditTodo = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editTodo,
    mutationKey: ["editTodo"],
  });
  return mutation;
};
export default useEditTodo;
