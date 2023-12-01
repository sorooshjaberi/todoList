import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  CircularProgress,
  Input,
  InputAdornment,
  Typography,
  lighten,
  useTheme,
} from "@mui/material";
import TodoDetail from "../../TodoDetail";
import {
  CheckCircleOutline,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import React, { memo, useState } from "react";
import TranslateL2RSmall from "../../ui/TranslateL2RSmall";
import { useTodoHandler } from "../../../providers/TodoHandler";
import { motion } from "framer-motion";
import { motionVariants } from "../../../lib/motion";
import useAddTodo from "../../../hooks/todos/useAddTodo";
import { useQueryClient } from "@tanstack/react-query";
import AddInput from "../AddInput";
import { Todo } from "../../../models/todos";
type Props = { todo: Todo; index: number; depth: number; clearTemp(): void };
const TodoItem = (props: Props) => {
  const { todo, index } = props;
  const [checked, setChecked] = useState<boolean>(!!todo.done);

  const { setCurrentTodo, currentTodo, currentPath, setCurrentPath } =
    useTodoHandler();

  const { mutateAsync, isPending } = useAddTodo();

  const queryClient = useQueryClient();

  const selectTodoHandler = (e: React.MouseEvent) => {
    if (!isTodoTemp) setCurrentTodo(todo.id);
    else {
      e.stopPropagation();
    }
  };

  const addHandler = (title: string) => {
    //send to backend
    mutateAsync({
      parent: currentPath[currentPath.length - 1],
      todoTitle: title,
    }).then(() => {
      props.clearTemp();
      queryClient.invalidateQueries({
        queryKey: ["todoGroup", currentPath[currentPath.length - 1]],
      });
    });
  };

  const isThisCurrentTodo = currentTodo === todo.id;

  const isTodoTemp = todo.id === 0;

  return (
    <Accordion expanded={isThisCurrentTodo}>
      <AccordionSummary>
        <Box
          className="flex h-[4rem] flex-1 cursor-pointer select-none items-center bg-[#e4e4e438] py-1"
          borderLeft={2}
          borderColor={({ palette }) => palette.primary.light}
          bgcolor={isThisCurrentTodo ? lighten("#e4e4e438", 0.5) : undefined}
          onClick={selectTodoHandler}
        >
          {!isTodoTemp && (
            <>
              <Checkbox
                onChange={(e) => {
                  setChecked(e.target.checked);
                }}
                onClick={(e) => e.stopPropagation()}
                checked={checked}
                icon={<RadioButtonUnchecked />}
                checkedIcon={<RadioButtonChecked />}
                sx={{
                  scale: ".8",
                }}
              />
              <Typography
                variant="subtitle1"
                fontSize={18}
                sx={({ palette }) => ({
                  textDecoration: checked ? "line-through" : "unset",
                  color: checked ? palette.grey.A400 : undefined,
                })}
              >
                {todo.title}
              </Typography>
            </>
          )}
          {isTodoTemp && (
            <>
              <AddInput
                {...{
                  addGroupHandler: addHandler,
                  isPending,
                }}
              />
            </>
          )}
        </Box>
      </AccordionSummary>
      {!isTodoTemp && (
        <AccordionDetails>
          <TodoDetail todoNumber={todo.id} checked={checked} />
        </AccordionDetails>
      )}
    </Accordion>
  );
};
export default memo(TodoItem);
