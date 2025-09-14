import React, { createContext, useState, useEffect, useContext } from "react";

// Create Auth Context
export const AuthContext = createContext();

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  const [token, setTokenState] = useState(
    () => localStorage.getItem("token") || null
  );

  // Sync user with localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Sync token with localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // Set user and token (after login)
  const setUser = (userObj, tkn) => {
    setUserState(userObj);
    setTokenState(tkn || null);
  };

  // Logout user
  const logout = () => {
    setUserState(null);
    setTokenState(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Navigation handled in component (e.g., Navbar)
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier context usage
export const useAuth = () => useContext(AuthContext);
