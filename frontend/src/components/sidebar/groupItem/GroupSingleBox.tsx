import { Add, CreateNewFolder, Delete } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { Dispatch, MouseEvent, SetStateAction } from "react";
import { Todo, TodoGroup } from "../../../models/todos";
import useDeleteGroup from "../../../hooks/todos/useDeleteGroup";
import { successToast } from "../../../lib/Toastify";
import { useTodoHandler } from "../../../providers/TodoHandler";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  setTempNewFolder: Dispatch<SetStateAction<TodoGroup>>;
  setTempNewTodo: Dispatch<SetStateAction<Partial<Todo>>>;
  addGroupToPath(): void;
  group: TodoGroup;
};

const GroupSingleBox = (props: Props) => {
  const { setTempNewFolder, setTempNewTodo, group, addGroupToPath } = props;
  const { mutateAsync } = useDeleteGroup();
  const { currentPath } = useTodoHandler();
  const queryClient = useQueryClient();

  return (
    <>
      <Typography variant="h6" className="mr-auto">
        {group.name}
      </Typography>
      <Box className="flex gap-2" onClick={(e) => e.stopPropagation()}>
        <IconButton
          onClick={(e) => {
            mutateAsync(group.id).then((deleteMessage) => {
              queryClient.invalidateQueries({
                queryKey: group.todoGroupId
                  ? ["todoGroup", group.todoGroupId]
                  : ["todoGroup"],
              });
              successToast(deleteMessage.data.message);
            });
          }}
        >
          <Delete className="hover:text-gray-400" />
        </IconButton>
        <IconButton
          onClick={(e) => {
            addGroupToPath();
            setTempNewFolder({ id: 0, name: "" });
          }}
        >
          <CreateNewFolder className="hover:text-gray-400" />
        </IconButton>
        <IconButton
          onClick={(e) => {
            addGroupToPath();
            setTempNewTodo({ id: 0, title: "" });
          }}
        >
          <Add className="hover:text-gray-400" />
        </IconButton>
      </Box>
    </>
  );
};

export default GroupSingleBox;
