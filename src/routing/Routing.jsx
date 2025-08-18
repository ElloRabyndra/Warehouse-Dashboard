import { Route, Routes } from "react-router";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import Home from "@/pages/Home";

// The following imports are commented out but show how other components would be imported if their routes were active:
// import Login from "@/pages/Login"; // Imports the Login page component
// import Profile from "@/pages/Profile"; // Imports the Profile page component
// import AuthRedirect from "@/features/auth/AuthRedirect"; // Imports AuthRedirect for redirecting authenticated users from login page
// import ProtectedRoute from "@/features/auth/ProtectedRoute"; // Imports ProtectedRoute for restricting access to authenticated users

/**
 * Routing component
 * This component defines the application's routes using React Router.
 * It also applies the current theme to the main section of the application.
 */

const Routing = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <section className={`${theme} bg-background text-foreground`}>
      <Routes>
        {/* Example of a route protected by AuthRedirect.
            Users who are already authenticated would be redirected away from the login page. */}
        {/* <Route path="/login" element={<AuthRedirect><Login/></AuthRedirect>} /> */}

        {/* Example of a protected route.
            Only authenticated users can access the profile page; otherwise, they are redirected to login. */}
        {/* <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} /> */}

        {/* Without authentication */}
        <Route path="/" element={<Home />} />
      </Routes>
    </section>
  );
};

export default Routing;
