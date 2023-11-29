import { useMutation } from "@tanstack/react-query";
import { addGroup } from "../../services/todos";

const useAddGroup = () => {
  const mutation = useMutation({
    mutationFn: addGroup,
    mutationKey: ["addGroup"],
  });

  return mutation;
};

export default useAddGroup;
