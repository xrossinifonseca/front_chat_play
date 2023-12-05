"use client";

import { createCustomer, loginCustomer } from "@/axios/api";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  customer: Customer | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (data: Login) => any;
  signup: (data: SignUp) => any;
  logout: () => void;
}

interface SignUp {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Login {
  email: string;
  password: string;
}

interface Customer {
  id: number;
  name: string;
  email: string;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [customer, SetCustomer] = useState<Customer | null>(null);
  const [token, setToken] = useState<string | null>(
    null
  );
  const router = useRouter();

  const isAuthenticated = !!customer && !!token;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getCustomer = localStorage.getItem("customer");
    if (token && getCustomer) {
      setToken(token);
      SetCustomer(JSON.parse(getCustomer));
    }
  }, [token]);

  const login = async (data: Login) => {
    const response = await loginCustomer(data);

    const { customer, token } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("customer", JSON.stringify(customer));

    setToken(token);
    SetCustomer(customer);
    router.push("/chat");
  };

  const signup = async (data: SignUp) => {
    const response = await createCustomer(data);

    const { customer, token } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("customer", JSON.stringify(customer));

    setToken(token);
    SetCustomer(customer);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("customer");
    setToken(null);
    SetCustomer(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ login, signup, logout, customer, token, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
