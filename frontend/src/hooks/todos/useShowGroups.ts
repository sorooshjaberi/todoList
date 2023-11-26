import { useQuery } from "@tanstack/react-query";
import { showGroups } from "../../services/todos";

const useShowGroups = (groupNumber?: number) => {
  const query = useQuery({
    queryKey: ["todoGroup", groupNumber],
    queryFn: () => showGroups(groupNumber),
    select: (data) => data.data,
  });
  return query;
};

export default useShowGroups;
