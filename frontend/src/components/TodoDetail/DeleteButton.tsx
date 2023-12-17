import { IconButton } from "@mui/material";
import React from "react";
import useDeleteTodo from "../../hooks/todos/useDeleteTodo";
import { successToast } from "../../lib/Toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Todo } from "../../models/todos";
import { Delete } from "@mui/icons-material";

type Props = { todoDetails: Todo };

const DeleteButton = (props: Props) => {
  const { todoDetails } = props;
  const { mutateAsync: deleteTodo } = useDeleteTodo();

  const queryClient = useQueryClient();
  return (
    <IconButton
      onClick={(e) => {
        deleteTodo(todoDetails.id).then((res) => {
          successToast(res.data.message);
          queryClient.invalidateQueries({
            queryKey: ["todoGroup", todoDetails.todoGroupId],
          });
        });
      }}
    >
      <Delete color="error" />
    </IconButton>
  );
};

export default DeleteButton;
