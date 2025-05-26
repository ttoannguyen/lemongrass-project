import { useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";
import { Switch } from "./ui/switch";

const ThemeButton: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <Switch onClick={toggleTheme}>
      {theme === "dark" ? "Light" : "Dark"}{" "}
    </Switch>
  );
};

export default ThemeButton;
