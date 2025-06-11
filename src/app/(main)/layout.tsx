import Footer from "@/components/main/navigation/Footer";
import Navbar from "@/components/main/navigation/Navbar";
import { Metadata } from "next/types";
import React, { FC } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: "%s | B2f",
    default: "B2f", // a default is required when creating a template
  },
};

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
