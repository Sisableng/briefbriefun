"use client";

import { Session, User } from "better-auth/types";
import React, { createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  user: User | null;
  session: Session | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  data: {
    user: User | null;
    session: Session | null;
  } | null;
}

export function AuthProvider({ children, data }: AuthProviderProps) {
  return (
    <AuthContext.Provider
      value={{ user: data?.user ?? null, session: data?.session ?? null }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
