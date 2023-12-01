import { Add, CreateNewFolder } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React, { Dispatch, MouseEvent, SetStateAction } from "react";
import { Todo, TodoGroup } from "../../../models/todos";

type Props = {
  setTempNewFolder: Dispatch<SetStateAction<TodoGroup>>;
  setTempNewTodo: Dispatch<SetStateAction<Partial<Todo>>>;
  addGroupToPath(): void;
  group: TodoGroup;
};

const GroupSingleBox = (props: Props) => {
  const { setTempNewFolder, setTempNewTodo, group, addGroupToPath } = props;

  return (
    <>
      <Typography variant="h6" className="mr-auto">
        {group.name}
      </Typography>
      <Box className="flex gap-2" onClick={(e) => e.stopPropagation()}>
        <CreateNewFolder
          onClick={(e) => {
            addGroupToPath();
            setTempNewFolder({ id: 0, name: "" });
          }}
          className="hover:text-gray-400"
        />
        <Add
          onClick={(e) => {
            addGroupToPath();
            setTempNewTodo({ id: 0, title: "" });
          }}
          className="hover:text-gray-400"
        />
      </Box>
    </>
  );
};

export default GroupSingleBox;
