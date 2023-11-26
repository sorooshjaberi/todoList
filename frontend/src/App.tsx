import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Theme from "./providers/Theme";
import { Typography } from "@mui/material";
import { PaletteModeProvider } from "./providers/paletteModeProvider";
import QueryProvider from "./providers/QueryProvider";
import useShowGroups from "./hooks/todos/useShowGroups";
import SideBar from "./components/sidebar/SideBar";

function App() {
  return (
    <PaletteModeProvider>
      <Theme>
        <QueryProvider>
          <SideBar/>
          <Typography fontWeight={"light"}>Hey</Typography>
        </QueryProvider>
      </Theme>
    </PaletteModeProvider>
  );
}

export default App;
