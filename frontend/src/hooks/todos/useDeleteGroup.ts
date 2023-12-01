import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroup, editTodo } from "../../services/todos";

const useDeleteGroup = () => {
  const mutation = useMutation({
    mutationFn: deleteGroup,
    mutationKey: ["deleteGroup"],
  });
  return mutation;
};
export default useDeleteGroup;
