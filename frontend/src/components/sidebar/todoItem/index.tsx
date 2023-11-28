import { Box, Checkbox, Typography, useTheme } from "@mui/material";
import { Todo } from "../../../models/todos";
import {
  CheckCircleOutline,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { useState } from "react";

type Props = { todo: Todo };
const TodoItem = (props: Props) => {
  const { todo } = props;
  const [checked, setChecked] = useState<boolean>(!!todo.done);
  return (
    <Box
      className="flex h-[4rem] cursor-pointer select-none items-center bg-[#e4e4e438] py-1 backdrop-blur"
      borderLeft={2}
      borderColor={({ palette }) => palette.primary.light}
    >
      <Checkbox
        onChange={(e) => setChecked(e.target.checked)}
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
  );
};
export default TodoItem;
