import { useQuery } from "@tanstack/react-query";
import { showTodo } from "../../services/todos";
import { isUndefined } from "lodash";
import { errorToast } from "../../lib/Toastify";
type Props = {
  todoId?: number;
};

const useShowTodo = (props: Props) => {
  const { todoId } = props;
  const query = useQuery({
    queryKey: ["todo", todoId],
    queryFn: () => showTodo(todoId),
    select: (data) => data.data.todo,
    enabled: !isUndefined(todoId),
    gcTime: 1000 * 60 * 60,
    meta: {
      onError(error: Error) {
        errorToast(error.message);
      },
    },
  });
  return query;
};

export default useShowTodo;
