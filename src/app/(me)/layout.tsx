import React, { FC } from "react";

interface MeLayoutProps {
  children: React.ReactNode;
}

const MeLayout = ({ children }: MeLayoutProps) => {
  return <>{children}</>;
};

export default MeLayout;
