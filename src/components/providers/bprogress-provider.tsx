"use client";
import { ProgressProvider } from "@bprogress/next/app";

import React, { FC } from "react";

interface BProgressProviderProps {
  children: React.ReactNode;
}

const BProgressProvider = ({ children }: BProgressProviderProps) => {
  return (
    <ProgressProvider
      color="var(--primary)"
      options={{
        showSpinner: false,
      }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};

export default BProgressProvider;
