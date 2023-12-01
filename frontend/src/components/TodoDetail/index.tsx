/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, memo, useEffect, useState } from "react";
import useShowTodo from "../../hooks/todos/useShowTodo";
import { useTodoHandler } from "../../providers/TodoHandler";
import {
  Box,
  CircularProgress,
  Snackbar,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import useEditTodo from "../../hooks/todos/useEditTodo";
import { Todo } from "../../models/todos";
import useDebounce from "../../hooks/useDebounce";
import { useQueryClient } from "@tanstack/react-query";
import useFirstTime from "../../hooks/useFirstTime";

type Props = { todoNumber: number; checked: boolean };

const TodoDetail = (props: Props) => {
  const {
    data: todoDetails,
    isLoading,
    isSuccess,
  } = useShowTodo({ todoId: props.todoNumber });

  const [todoValues, setTodoValues] = useState<Partial<Todo>>();

  useEffect(() => {
    setTodoValues((e) => ({
      ...e,
      done: props.checked,
    }));
  }, [props.checked]);

  const debouncedValues = useDebounce(todoValues, 500);

  const firstTime = useFirstTime();

  const { mutateAsync } = useEditTodo();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (todoValues && !firstTime) {
      mutateAsync({ todoNumber: props.todoNumber, todoData: todoValues }).then(
        (res) => {
          queryClient.invalidateQueries({
            queryKey: ["todoGroup", todoDetails.todoGroupId],
          });
          queryClient.invalidateQueries({
            queryKey: ["todo", todoDetails.id],
          });
        },
      );
    }
  }, [debouncedValues]);

  const changeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setTodoValues((e) => ({
      ...e,
      [name]: value,
    }));
  };

  if (isLoading) {
    return (
      <Box className="flex h-full items-center justify-center">
        <CircularProgress size={100} />
      </Box>
    );
  }
  if (isSuccess) {
    return (
      <Box className="flex flex-col gap-6 px-4">
        <TextField
          fullWidth
          name="title"
          defaultValue={todoDetails.title}
          onChange={changeHandler}
          label="Title"
        />
        <TextField
          fullWidth
          name="description"
          defaultValue={todoDetails.description}
          onChange={changeHandler}
          label="Description"
          multiline
        />
      </Box>
    );
  }

  return (
    <Box className="flex h-full select-none items-center justify-center">
      <Typography variant="h3" color={"grey"} component={"h3"}>
        Select a TodoDetail
      </Typography>
    </Box>
  );
};

export default memo(TodoDetail);
