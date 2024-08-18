"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";


interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  loading: boolean;
  logout: () => void; // Add logout function
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedLoginState === "true");
    setLoading(false);
  }, []);

  const updateLoginState = (value: boolean) => {
    setIsLoggedIn(value);
    localStorage.setItem("isLoggedIn", String(value));
  };

  const logout = () => {
    setLoading(true); 
    localStorage.removeItem("isLoggedIn"); 
    setIsLoggedIn(false); 
    setLoading(false);
    router.push("/Login")
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn: updateLoginState, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
