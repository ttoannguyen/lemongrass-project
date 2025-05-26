/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextProp {
  theme: Theme;
  toggleTheme: () => void;
  setSystemTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProp>({
  theme: "system",
  toggleTheme: () => {},
  setSystemTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme;
    if (storedTheme && storedTheme !== "system") {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      setSystemTheme();
    }
  }, []);

  const setSystemTheme = () => {
    const isSystemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const newTheme = isSystemDark ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", isSystemDark);
  };
  const toggleTheme = () => {
    let newTheme: Theme;
    if (theme === "light") newTheme = "dark";
    else if (theme === "dark") newTheme = "light";
    else newTheme = "dark";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    if (theme === "system") setSystemTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
