import { Box, Checkbox, Typography, useTheme } from "@mui/material";
import { Todo } from "../../../models/todos";
import {
  CheckCircleOutline,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { useState } from "react";
import TranslateL2RSmall from "../../ui/TranslateL2RSmall";
import { useTodoHandler } from "../../../providers/TodoHandler";
import { motion } from "framer-motion";
import { motionVariants } from "../../../lib/motion";

type Props = { todo: Todo; index: number; depth: number };
const TodoItem = (props: Props) => {
  const { todo, index } = props;
  const [checked, setChecked] = useState<boolean>(!!todo.done);

  const { setCurrentTodo, currentTodo } = useTodoHandler();

  const selectTodoHandler = () => {
    setCurrentTodo(todo.id);
  };

  const isThisCurrentTodo = currentTodo === todo.id;

  return (
    // <TranslateL2RSmall
    //   motionProps={{
    //     transition: {
    //       delay: index * 0.3,
    //       type: "spring",
    //       stiffness: 1000,
    //     },
    //   }}
    // >
    <motion.div
      variants={motionVariants}
      initial="left10"
      animate="swipFromLeft10"
      transition={{ delay: index * 0.3 }}
    >
      <Box
        className="flex h-[4rem] cursor-pointer select-none items-center bg-[#e4e4e438] py-1 transition-all duration-200"
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
    </motion.div>

    // </TranslateL2RSmall>
  );
};
export default TodoItem;
