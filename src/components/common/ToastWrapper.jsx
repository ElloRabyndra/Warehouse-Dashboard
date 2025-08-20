import React from "react";
import { ToastContainer } from "react-toastify"; 

const ToastWrapper = () => {

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
      theme="light" // Applies the current application theme to the toasts
    />
  );
}

export default ToastWrapper 