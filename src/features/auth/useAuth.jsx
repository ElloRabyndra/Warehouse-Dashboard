import { createContext, useContext, useState, useEffect } from 'react';

// Context for Authentication
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load users and check authentication when the application loads
  useEffect(() => {
    try {
      // Load users from localStorage
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      setUsers(storedUsers);

      // Check if a user was previously logged in
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (error) {
      console.error("Error loading data from localStorage", error);
      setUsers([]);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Function to register a new user
  const register = (userData) => {
    try {
      const { email, password } = userData;
      const newUser = { 
        id: Date.now(),
        email: email.toLowerCase(), 
        password 
      };

      // Update users list
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      
      // Save to localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      
      return { success: true, message: "Registration successful!" };
    } catch (error) {
      return { success: false, message: "Registration failed!" };
    }
  };

  // Function for login
  const login = (credentials) => {
    try {
      const { email, password } = credentials;
      
      // Find user by email and password
      const foundUser = users.find(
        (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
      );

      if (foundUser) {
        const userSession = {
          id: foundUser.id,
          email: foundUser.email
        };
        
        setUser(userSession);
        localStorage.setItem("currentUser", JSON.stringify(userSession));
        
        return { success: true, message: "Login successful!", user: userSession };
      } else {
        return { success: false, message: "Invalid credentials!" };
      }
    } catch (error) {
      return { success: false, message: "Login failed!" };
    }
  };

  // Function for logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  // Function to check if an email is already registered
  const isEmailRegistered = (email) => {
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
  };

  // Function to validate password
  const validatePassword = (email, password) => {
    const foundUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    return foundUser && foundUser.password === password;
  };

    // Function to update profile
  const updateProfile = (profileData) => {
    try {
      const { email, old_password, new_password } = profileData;
      
      // Find the current user
      const currentUserIndex = users.findIndex(u => u.id === user.id);
      
      if (currentUserIndex === -1) {
        return { success: false, message: "User not found!" };
      }
      
      const currentUserData = users[currentUserIndex];
      
      // Validate old password
      if (currentUserData.password !== old_password) {
        return { success: false, message: "Incorrect old password!" };
      }
      
      // If email changes, check if the new email is already used by another user
      if (email.toLowerCase() !== currentUserData.email.toLowerCase()) {
        const emailExists = users.some(u => 
          u.id !== user.id && u.email.toLowerCase() === email.toLowerCase()
        );
        
        if (emailExists) {
          return { success: false, message: "Email already in use!" };
        }
      }
      
      // Update user data
      const updatedUser = {
        ...currentUserData,
        email: email.toLowerCase(),
        password: new_password
      };
      
      // Update users array
      const updatedUsers = [...users];
      updatedUsers[currentUserIndex] = updatedUser;
      setUsers(updatedUsers);
      
      // Update current user session
      const updatedUserSession = {
        id: updatedUser.id,
        email: updatedUser.email
      };
      setUser(updatedUserSession);
      
      // Save to localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("currentUser", JSON.stringify(updatedUserSession));
      
      return { success: true, message: "Profile updated successfully!" };
    } catch (error) {
      return { success: false, message: "Profile update failed!" };
    }
  };

  const value = {
    user,
    users,
    isLoading,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    isEmailRegistered,
    validatePassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};