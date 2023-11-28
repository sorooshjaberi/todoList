import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { showGroups } from "../../services/todos";

const useShowGroups = (groupNumber?: number, enabled: boolean = true) => {
  const query = useQuery({
    queryKey: ["todoGroup", groupNumber],
    queryFn: () => showGroups(groupNumber),
    select: (data) => data.data,
    gcTime: 1000 * 60 * 60,
    enabled,
  });
  return query;
};

export default useShowGroups;
