import { useContext } from "react";
import { type ThemeContextType, ThemeContext } from "../types/theme";

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
