import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router"; // Imports BrowserRouter for client-side routing
import ToastWrapper from "./components/common/ToastWrapper"; // Imports ToastWrapper for displaying toast notifications
import Routing from "./routing/Routing"; // Imports Routing component which defines application routes
import "./style/Style.css"; // Imports global CSS styles

createRoot(document.getElementById("root")).render(
  <StrictMode>
        <BrowserRouter>
          <ToastWrapper />
          <Routing />
        </BrowserRouter>
  </StrictMode>
);
