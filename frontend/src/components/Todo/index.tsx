import React from "react";
import useShowTodo from "../../hooks/todos/useShowTodo";
import { useTodoHandler } from "../../providers/TodoHandler";
import { Box, CircularProgress, Snackbar, Typography } from "@mui/material";

type Props = {};

const Todo = (props: Props) => {
  const { currentTodo } = useTodoHandler();
  const {
    data: todoDetails,
    isLoading,
    isSuccess,
  } = useShowTodo({ todoId: currentTodo });

  if (isLoading) {
    return (
      <Box className="flex h-full items-center justify-center">
        <CircularProgress size={100} />
      </Box>
    );
  }
  if (isSuccess) {
    return (
      <Box className="">
        <Typography variant={"h3"} component="h1" className="w-max max-w-[90%]">
          {todoDetails.title}
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="flex h-full select-none items-center justify-center">
      <Typography variant="h3" color={"grey"} component={"h3"}>
        Select a Todo
      </Typography>
    </Box>
  );
};

export default Todo;
