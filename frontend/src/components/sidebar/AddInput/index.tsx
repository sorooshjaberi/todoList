import { CircularProgress, Input, InputAdornment } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import { motionVariants } from "../../../lib/motion";
type Props = {
  isPending: boolean;
  addGroupHandler(value: string): void;
};

const AddInput = (props: Props) => {
  const { addGroupHandler, isPending } = props;
  return (
    <Input
      autoFocus
      fullWidth
      disabled={isPending}
      onBlur={(event) =>
        event?.target?.value && addGroupHandler(event?.target?.value)
      }
      onKeyUp={(event) =>
        event.key === "Enter" &&
        event?.currentTarget?.value &&
        addGroupHandler(event?.currentTarget?.value)
      }
      endAdornment={
        isPending && (
          <InputAdornment position="end">
            <CircularProgress size={10} className="mx-2" />
          </InputAdornment>
        )
      }
    />
  );
};

export default AddInput;
