import { Add } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";

type Props = { addGroupHandler(value: string): void };

const RootAddInput = (props: Props) => {
  const { addGroupHandler } = props;
  const [input, setInput] = useState<string>();

  return (
    <>
      <Box className="relative flex items-center justify-center gap-4 w-min mx-auto">
        <TextField
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="w-[250px]"
          inputProps={{
            onKeyUp: (event) => {
              if (event.key === "Enter" && event?.currentTarget?.value) {
                addGroupHandler(event?.currentTarget?.value);
                setInput("");
              }
            },
          }}
        />
        <IconButton
          className="!absolute right-[-3rem] top-[50%] translate-y-[-50%]"
          sx={({ palette }) => ({
            bgcolor: palette.grey.A700,
          })}
          onClick={() => {
            addGroupHandler(input);
            setInput("");
          }}
        >
          <Add fontSize={"medium"} />
        </IconButton>
      </Box>
    </>
  );
};

export default RootAddInput;
