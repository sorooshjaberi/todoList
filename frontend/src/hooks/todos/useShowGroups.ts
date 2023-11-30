import { QueryOptions, UseQueryOptions, useQuery } from "@tanstack/react-query";
import { showGroups } from "../../services/todos";
import { errorToast } from "../../lib/Toastify";
import { useTodoHandler } from "../../providers/TodoHandler";
import { ShowGroupResponse } from "../../models/todos";

const useShowGroups = (groupNumber?: number, enabled: boolean = true) => {
  const { setCurrentPath } = useTodoHandler();
  const query = useQuery({
    queryKey: ["todoGroup", groupNumber],
    queryFn: () => showGroups(groupNumber),
    select: (data) => data.data,
    gcTime: 1000 * 60 * 60,
    enabled,
    meta: {
      onSuccess(data) {
        const path = (data.data as ShowGroupResponse).parentPath;
        setCurrentPath(path);
      },
      onError(error: Error) {
        errorToast(error.message);
      },
    },
  });
  return query;
};

export default useShowGroups;
