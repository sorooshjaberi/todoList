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

function App() {
  return (
    <PaletteModeProvider>
      <Theme>
        <QueryProvider>
          <MainLayout>
            <Box className="h-full grid grid-cols-12">
              <Box className="col-span-3 z-10 p-2">
                <SideBar />
              </Box>
              <Box className="col-span-3 p-2">
                <Typography>hey</Typography>
              </Box>
            </Box>
          </MainLayout>
        </QueryProvider>
      </Theme>
    </PaletteModeProvider>
  );
}

export default App;
