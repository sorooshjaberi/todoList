import { Box, Grid } from "@mui/material";
import SideBar from "../sidebar/SideBar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const MainLayout = (props: Props) => {
  return (
    <Box
      className="h-[100dvh] overflow-y-auto"
      sx={{
        background: ({palette}) =>
          `linear-gradient(62deg, rgba(73, 0, 63, 0.348) 0%, rgba(53, 0, 138, 0.647) 100%);100%)`,
      }}
    >
      {props.children}
    </Box>
  );
};
export default MainLayout;
