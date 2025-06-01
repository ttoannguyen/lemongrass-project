import { Switch } from "radix-ui";
import { useTheme } from "../hooks/useTheme";
import { FiMoon, FiSun } from "react-icons/fi";
import clsx from "clsx";
type Props = {
  className?: string;
};

const ToggleThemeButton = ({ className }: Props) => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className={clsx("flex items-center", className)}>
      <Switch.Root
        checked={isDark}
        onCheckedChange={toggleTheme}
        className="relative h-[15px] w-[28px] rounded-full bg-gray-200 dark:bg-green-600 transition-colors shadow"
        id="dark-mode"
      >
        <Switch.Thumb className="flex items-center justify-center size-[12px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[15px]">
          {!isDark ? (
            <FiSun className="text-green-600" />
          ) : (
            <FiMoon className="dark:text-green-600" />
          )}
        </Switch.Thumb>
      </Switch.Root>
    </div>
  );
};

export default ToggleThemeButton;
