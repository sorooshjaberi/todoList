import Theme from "./providers/Theme";
import { Box, Typography } from "@mui/material";
import { PaletteModeProvider } from "./providers/paletteModeProvider";
import QueryProvider from "./providers/QueryProvider";
import SideBar from "./components/sidebar/SideBar";
import MainLayout from "./components/layout/MainLayout";
import { TodoHandlerProvider } from "./providers/TodoHandler";
import Todo from "./components/TodoDetail";
import { ToastContainer } from "react-toastify";
import cntl from "cntl";
import ErrorBoundry from "./providers/ErrorBoundry";
import Controller from "./components/controller";

function App() {
  return (
    // <ErrorBoundry>
    <>
      <PaletteModeProvider>
        <Theme>
          <QueryProvider>
            <TodoHandlerProvider>
              <MainLayout>
                <Box className="flex h-full justify-center">
                  <Box className="z-10 max-w-[800px] flex-1 p-2">
                    <SideBar />
                  </Box>
                </Box>
              </MainLayout>
            </TodoHandlerProvider>
          </QueryProvider>
        </Theme>
      </PaletteModeProvider>
    </>
    // </ErrorBoundry>
  );
}

export default App;
