/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, memo, useEffect, useState } from "react";
import useShowTodo from "../../hooks/todos/useShowTodo";
import { AnimatePresence, Variant, Variants, motion } from "framer-motion";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useEditTodo from "../../hooks/todos/useEditTodo";
import { Todo } from "../../models/todos";
import useDebounce from "../../hooks/useDebounce";
import { useQueryClient } from "@tanstack/react-query";
import useFirstTime from "../../hooks/useFirstTime";
import useDeleteTodo from "../../hooks/todos/useDeleteTodo";
import { Delete, AddAlert } from "@mui/icons-material";
import { successToast } from "../../lib/Toastify";
import DeleteButton from "./DeleteButton";
import {
  DatePicker,
  MobileDatePicker,
  MobileTimePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import moment from "moment";
import AddSchedule from "./AddSchedule";
type Props = { todoNumber: number; checked: boolean };



const TodoDetail = (props: Props) => {
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false);
  const {
    data: todoDetails,
    isLoading,
    isSuccess,
  } = useShowTodo({ todoId: props.todoNumber });

  // const { mutateAsync: deleteTodo } = useDeleteTodo();

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

  const toggleSchedule = () => {
    setIsScheduleOpen((prev) => !prev);
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
      <Box className="flex flex-col gap-6 overflow-y-hidden px-4">
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
        <Box>
          <Box className="mb-4 flex items-center justify-end">
            <DeleteButton todoDetails={todoDetails} />
            <IconButton onClick={toggleSchedule}>
              <AddAlert color="disabled" />
            </IconButton>
          </Box>
          <AnimatePresence>
            {isScheduleOpen && (
        <AddSchedule toggleSchedule={toggleSchedule}/>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    );
  }

  return <></>;
};

export default memo(TodoDetail);
