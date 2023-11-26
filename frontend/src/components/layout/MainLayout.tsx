import { Box, Grid } from "@mui/material";
import SideBar from "../sidebar/SideBar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const MainLayout = (props: Props) => {
  return <Box className="h-[100dvh] overflow-y-auto">{props.children}</Box>;
};
export default MainLayout;
