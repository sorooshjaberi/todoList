import React, { FC, ReactNode, createContext, useContext } from "react";
import {
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import usePaletteMode from "../hooks/ui/usePaletteMode";
type Props = {
  children: ReactNode;
};

const Theme: FC<Props> = (props) => {
  const { mode } = usePaletteMode();

  const theme = createTheme({
    palette: {
      primary: purple,
      mode,
    },
    typography: {
      fontFamily: "Nunito",
      fontWeightRegular: "300",
      fontWeightMedium: "700",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {props.children}
      <CssBaseline />
    </ThemeProvider>
  );
};

export default Theme;
