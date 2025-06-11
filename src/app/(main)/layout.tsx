import Footer from "@/components/main/navigation/Footer";
import Navbar from "@/components/main/navigation/Navbar";
import React, { FC } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="flex min-h-dvh flex-col gap-10">
      <Navbar />

      <div className="flex-1 pb-20">{children}</div>

      <Footer />
    </main>
  );
};

export default MainLayout;
