"use client";

import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      // Ensure the user object has an id property
      setUser({
        ...userData,
        id: userData._id || userData.id, // MongoDB uses _id, we normalize to id
      });
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    // Normalize the user data structure
    const normalizedUser = {
      ...userData,
      id: userData._id || userData.id,
    };
    setUser(normalizedUser);
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
