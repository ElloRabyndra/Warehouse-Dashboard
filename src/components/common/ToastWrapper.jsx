import React, { useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify"; 
import { ThemeContext } from "../../context/ThemeContext"; 

/**
 * ToastWrapper component
 * This component acts as a container for displaying toast notifications throughout the application.
 * It integrates with the theme context to apply the correct theme to the toasts
 * and dismisses all active toasts when the theme changes.
 */

const ToastWrapper = () => {
  // Accesses the current theme from the ThemeContext
  const { theme } = useContext(ThemeContext);

  // Effect hook to dismiss all active toasts whenever the theme changes.
  // This ensures toasts align with the new theme without lingering.
  useEffect(() => {
    toast.dismiss();
  }, [theme]); // Dependency array: runs effect when 'theme' changes

  return (
    // ToastContainer component configures the behavior and appearance of all toasts
    <ToastContainer
      position="bottom-right" // Position of the toast notifications on the screen
      autoClose={3000} // Time in milliseconds after which the toast will close automatically
      hideProgressBar={false} // Shows or hides the progress bar of the toast
      newestOnTop={false} // Determines if new toasts appear on top of older ones
      closeOnClick // Closes the toast when clicked
      rtl={false} // Right-to-left layout support
      pauseOnFocusLoss // Pauses the autoClose timer when the window loses focus
      draggable // Allows toasts to be dragged
      pauseOnHover // Pauses the autoClose timer when the mouse hovers over the toast
      theme={theme} // Applies the current application theme to the toasts
    />
  );
}

export default ToastWrapper 