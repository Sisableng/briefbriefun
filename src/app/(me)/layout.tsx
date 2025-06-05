import Navbar from "@/components/me/navigations/Navbar";
import React from "react";

interface MeLayoutProps {
  children: React.ReactNode;
}

const MeLayout = async ({ children }: MeLayoutProps) => {
  return (
    <main className="flex min-h-dvh flex-col gap-20 pb-20">
      <Navbar />
      {children}
    </main>
  );
};

export default MeLayout;
