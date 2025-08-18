import { Switch } from "./switch"; 
import { useContext } from "react"; 
import { ThemeContext } from "../../context/ThemeContext"; 

/**
 * SwitchTheme component
 * This component provides a UI element (a switch) to Switch between dark and light themes.
 * It consumes the ThemeContext to get and update the current theme.
 */

export function SwitchTheme() {
  // Accesses the current 'theme' and the 'SwitchTheme' function from the ThemeContext
  const { theme, toggleTheme  } = useContext(ThemeContext);
  // Determines if the current theme is 'dark' to set the initial state of the switch
  const isDark = theme === "dark";
  
  return (
    // Renders the Switch component
    <Switch
      id="theme-Switch" 
      checked={isDark} 
      onCheckedChange={toggleTheme } 
      className={"scale-150 cursor-pointer"} 
    />
  );
}