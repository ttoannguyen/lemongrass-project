import { Moon, Sun } from "lucide-react";
// import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/theme-provider";
import { Toggle } from "@/components/ui/toggle";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="flex items-center space-x-2">
      <Toggle
        pressed={isDark}
        onPressedChange={handleToggle}
        aria-label="Toggle theme"
        className="cursor-pointer"
      >{isDark ? (
        <Moon className="h-4 w-4 text-background-d " />
      ) : (
        <Sun className="h-4 w-4 text-background-l" />
      )}</Toggle>
    </div>
  );
}
