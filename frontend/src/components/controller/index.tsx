import { Box } from "@mui/material";
import React from "react";

type Props = {};

const Controller = (props: Props) => {
  return (
      <Box
        className="h-full p-4"
        borderLeft={1}
        borderColor={({ palette }) => palette.primary.main}
      >
        Controllers
      </Box>
  );
};

export default Controller;
