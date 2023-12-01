import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroup, editTodo } from "../../services/todos";

const useDeleteGroup = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteGroup,
    mutationKey: ["deleteTodo"],
  });
  return mutation;
};
export default useDeleteGroup;
