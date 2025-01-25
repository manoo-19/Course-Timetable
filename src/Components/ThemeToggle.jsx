import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
    >
      {theme === "light" ? (
        <Moon className="text-neutral-800" size={24} />
      ) : (
        <Sun className="text-yellow-500" size={24} />
      )}
    </button>
  );
};

export default ThemeToggle;
