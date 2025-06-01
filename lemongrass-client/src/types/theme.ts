// src/types/theme.ts

import { createContext } from "react";

// Enum hoặc Union type cho theme
export type Theme = "light" | "dark";

// Interface cho context
export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
