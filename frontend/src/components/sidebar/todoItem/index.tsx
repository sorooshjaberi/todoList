import {
  Box,
  Checkbox,
  CircularProgress,
  Input,
  InputAdornment,
  Typography,
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

type Props = { todo: Todo; index: number; depth: number; clearTemp(): void };
const TodoItem = (props: Props) => {
  const { todo, index } = props;
  const [checked, setChecked] = useState<boolean>(!!todo.done);

  const { setCurrentTodo, currentTodo, currentFolder } = useTodoHandler();

  const { mutateAsync, isPending } = useAddTodo();

  const queryClient = useQueryClient();

  const selectTodoHandler = () => {
    setCurrentTodo(todo.id);
  };

  const addHandler = (title: string) => {
    //send to backend
    mutateAsync({ parent: currentFolder, todoTitle: title }).then(() => {
      props.clearTemp();
      queryClient.invalidateQueries({
        queryKey: ["todoGroup", currentFolder],
      });
    });
  };

  const isThisCurrentTodo = currentTodo === todo.id;

  return (
    <motion.div
      variants={motionVariants}
      initial="left10"
      animate="swipFromLeft10"
      transition={{
        delay: index * 0.1,
      }}
    >
      {todo.id !== 0 && (
        <Box
          className="flex h-[4rem] cursor-pointer select-none items-center bg-[#e4e4e438] py-1"
          borderLeft={2}
          borderColor={({ palette }) => palette.primary.light}
          bgcolor={isThisCurrentTodo ? "#333333d3" : undefined}
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
        <Box
          className="flex h-[4rem] cursor-pointer select-none items-center bg-[#e4e4e438] px-2"
          borderLeft={2}
          borderColor={({ palette }) => palette.primary.light}
        >
          <Input
            autoFocus
            fullWidth
            disabled={isPending}
            onBlur={(event) =>
              event?.target?.value && addHandler(event?.target?.value)
            }
            onKeyUp={(event) =>
              event.key === "Enter" &&
              event?.currentTarget?.value &&
              addHandler(event?.currentTarget?.value)
            }
            endAdornment={
              isPending && (
                <InputAdornment position="end">
                  <CircularProgress size={10} className="mx-2" />
                </InputAdornment>
              )
            }
          />
        </Box>
      )}
    </motion.div>
  );
};
export default memo(TodoItem);
