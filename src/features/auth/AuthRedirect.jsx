import { Navigate } from "react-router"; 
import { useAuth } from "./useAuth"; 

/**
 * AuthRedirect component
 * This component is used to redirect authenticated users away from certain routes,
 * typically authentication-related pages like login or register.
 * If a user is already authenticated, they are redirected to the home page.
 */

const AuthRedirect = ({ children }) => {
  // Accesses the authentication status from the useAuth hook
  const { isAuthenticated } = useAuth();

  // If the user is authenticated, redirect them to the home page.
  // 'replace' prop ensures the navigation replaces the current entry in the history stack.
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If the user is not authenticated, render the children (the original component)
  return children;
};

export default AuthRedirect;