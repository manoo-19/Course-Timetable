import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-slate-300 dark:bg-[#121212] hover:bg-slate-400 dark:hover:bg-neutral-700 transition-colors"
    >
      {theme === "light" ? (
        <Moon className="text-black" size={24} />
      ) : (
        <Sun className="text-yellow-500" size={24} />
      )}
    </button>
  );
};

export default ThemeToggle;
