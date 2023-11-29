import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Theme from "./providers/Theme";
import { Box, Typography } from "@mui/material";
import { PaletteModeProvider } from "./providers/paletteModeProvider";
import QueryProvider from "./providers/QueryProvider";
import SideBar from "./components/sidebar/SideBar";
import MainLayout from "./components/layout/MainLayout";
import { TodoHandlerProvider } from "./providers/TodoHandler";

function App() {
  return (
    <PaletteModeProvider>
      <Theme>
        <QueryProvider>
          <TodoHandlerProvider>
            <MainLayout>
              <Box className="grid h-full grid-cols-12">
                <Box className="z-10 col-span-3 p-2">
                  <SideBar />
                </Box>
                <Box className="col-span-3 p-2">
                  <Typography>hey</Typography>
                </Box>
              </Box>
            </MainLayout>
          </TodoHandlerProvider>
        </QueryProvider>
      </Theme>
    </PaletteModeProvider>
  );
}

export default App;
