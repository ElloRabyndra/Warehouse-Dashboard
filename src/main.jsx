import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router"; // Imports BrowserRouter for client-side routing
import { AuthProvider } from "./features/auth/useAuth"; // Imports AuthProvider for authentication context
import ThemeProvider from "./context/ThemeContext"; // Imports ThemeProvider for theme management
import ToastWrapper from "./components/common/ToastWrapper"; // Imports ToastWrapper for displaying toast notifications
import Routing from "./routing/Routing"; // Imports Routing component which defines application routes
import "./style/Style.css"; // Imports global CSS styles

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <ToastWrapper />
          <Routing />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
