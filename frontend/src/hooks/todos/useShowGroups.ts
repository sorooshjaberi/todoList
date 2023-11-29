import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { showGroups } from "../../services/todos";
import { errorToast } from "../../lib/Toastify";

const useShowGroups = (groupNumber?: number, enabled: boolean = true) => {
  const query = useQuery({
    queryKey: ["todoGroup", groupNumber],
    queryFn: () => showGroups(groupNumber),
    select: (data) => data.data,
    gcTime: 1000 * 60 * 60,
    enabled,
    throwOnError: (error) => {
      errorToast(error.message);
      return false;
    },
  });
  return query;
};

export default useShowGroups;
