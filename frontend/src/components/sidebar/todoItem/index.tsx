import {
  Box,
  Checkbox,
  CircularProgress,
  Input,
  InputAdornment,
  Typography,
  lighten,
  useTheme,
} from "@mui/material";
import { Todo } from "../../../models/todos";
import {
  CheckCircleOutline,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { memo, useState } from "react";
import TranslateL2RSmall from "../../ui/TranslateL2RSmall";
import { useTodoHandler } from "../../../providers/TodoHandler";
import { motion } from "framer-motion";
import { motionVariants } from "../../../lib/motion";
import useAddTodo from "../../../hooks/todos/useAddTodo";
import { useQueryClient } from "@tanstack/react-query";
import AddInput from "../AddInput";

type Props = { todo: Todo; index: number; depth: number; clearTemp(): void };
const TodoItem = (props: Props) => {
  const { todo, index } = props;
  const [checked, setChecked] = useState<boolean>(!!todo.done);

  const { setCurrentTodo, currentTodo, currentPath, setCurrentPath } =
    useTodoHandler();

  const { mutateAsync, isPending } = useAddTodo();

  const queryClient = useQueryClient();

  const selectTodoHandler = () => {
    setCurrentTodo(todo.id);
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

  return (
    <>
      {todo.id !== 0 && (
        <Box
          className="flex h-[4rem] cursor-pointer select-none items-center bg-[#e4e4e438] py-1"
          borderLeft={2}
          borderColor={({ palette }) => palette.primary.light}
          bgcolor={isThisCurrentTodo ? lighten("#e4e4e438", 0.3) : undefined}
          onClick={selectTodoHandler}
        >
          <Checkbox
            onChange={(e) => {
              e.stopPropagation();
              setChecked(e.target.checked);
            }}
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
        </Box>
      )}
      {todo.id === 0 && (
        <motion.div
          variants={motionVariants}
          animate="float"
          transition={{ duration: 0.5, repeatType: "mirror", repeat: Infinity }}
        >
          <Box
            className="flex h-[4rem] cursor-pointer select-none items-center bg-[#e4e4e438] px-2"
            borderLeft={2}
            borderColor={({ palette }) => palette.primary.light}
          >
            <AddInput
              {...{
                addGroupHandler: addHandler,
                isPending,
              }}
            />
          </Box>
        </motion.div>
      )}
    </>
  );
};
export default memo(TodoItem);
