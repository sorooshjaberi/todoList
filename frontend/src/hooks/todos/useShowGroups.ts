import { useQuery } from "@tanstack/react-query";
import { showGroups } from "../../services/todos";

const useShowGroups = (groupNumber?: number) => {
  useQuery({
    queryKey: ["todoGroup", groupNumber],
    queryFn: () => showGroups(groupNumber),
  });
};

export default useShowGroups;
