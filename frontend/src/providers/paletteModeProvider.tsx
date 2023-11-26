import { PaletteMode } from "@mui/material";
import { FC, ReactNode, createContext, useState } from "react";

export const paletteModeCtx = createContext<{
  mode: PaletteMode;
  setMode(mode: PaletteMode): void;
}>({
  mode: "dark",
  setMode() {},
});

export const PaletteModeProvider: FC<{ children: ReactNode }> = (props) => {
  const [mode, setMode] = useState<PaletteMode>("dark");
  return (
    <paletteModeCtx.Provider
      value={{
        mode,
        setMode,
      }}
    >
      {props.children}
    </paletteModeCtx.Provider>
  );
};
