import { Navigate, useLocation } from "react-router"; 
import { useAuth } from "./useAuth"; 

/**
 * ProtectedRoute component
 * This component is used to protect routes, ensuring that only authenticated users can access them.
 * If a user is not authenticated, they are redirected to the login page.
 */

const ProtectedRoute = ({ children }) => {
  // Accesses authentication status and loading state from the useAuth hook
  const { isAuthenticated, isLoading } = useAuth();
  // Gets the current location object, useful for redirecting back after login
  const location = useLocation();

  // Display a loading indicator (or nothing) while authentication status is being checked
  if (isLoading) {
    return null;
  }

  // If the user is not authenticated, redirect them to the login page.
  // The 'state' prop saves the current location, allowing redirection back after successful login.
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is authenticated, render the children (the protected content/component)
  return children;
};

export default ProtectedRoute; 