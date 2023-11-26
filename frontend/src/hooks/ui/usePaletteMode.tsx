import { PaletteMode } from "@mui/material";
import { createContext, useContext } from "react";
import { paletteModeCtx } from "../../providers/paletteModeProvider";

const usePaletteMode = () => useContext(paletteModeCtx);

export default usePaletteMode;
