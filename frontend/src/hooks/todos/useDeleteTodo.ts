import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroup, deleteTodo, editTodo } from "../../services/todos";

const useDeleteTodo = () => {
  const mutation = useMutation({
    mutationFn: deleteTodo,
    mutationKey: ["deleteTodo"],
  });
  return mutation;
};
export default useDeleteTodo;
