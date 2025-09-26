"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";
import LoginModal from "../components/LoginModal";
import { useRouter } from "next/navigation";

// Define types
type LoginContextType = {
  showLogin: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  handleLoginSuccess: () => void;
  authRoute:(path:string)=>void;
};

// Create context
const LoginContext = createContext<LoginContextType | undefined>(undefined);

// Provider props
type LoginProviderProps = {
  children: ReactNode;
};

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [showLogin, setShowLogin] = useState(false);
  const router=useRouter();

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);

  const handleLoginSuccess = () => {
    console.log("✅ Login Successful!");
    setShowLogin(false);
  };

  const authRoute=(path:string)=>{
   const token=localStorage.getItem("token");
   if(token)
   {
     router.push(path);
   }
   else{
    openLogin();
   }
  }

  return (
    <>
    <LoginContext.Provider value={{ showLogin, openLogin, closeLogin, handleLoginSuccess,authRoute }}>
      {children}
      <LoginModal
        isOpen={showLogin}
        onClose={closeLogin}
        onLoginSuccess={handleLoginSuccess}
      />
    </LoginContext.Provider>
    </>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};
