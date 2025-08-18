import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { Card } from "./card";

export function ToggleTheme() {
  // Accesses the current 'theme' and the 'toggleTheme' function from the ThemeContext
  const { theme, toggleTheme } = useContext(ThemeContext);
  // Determines if the current theme is 'dark' to set the initial state of the switch
  const isDark = theme === "dark";

  return (
    <Card className="p-3 rounded-full">
      {isDark ? (
        <Sun size={24} className="cursor-pointer" onClick={toggleTheme}></Sun>
      ) : (
        <Moon size={24} className="cursor-pointer" onClick={toggleTheme}></Moon>
      )}
    </Card>
  );
}
