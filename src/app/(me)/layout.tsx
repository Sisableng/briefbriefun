import { AuthProvider } from "@/components/context/auth-context";
import Navbar from "@/components/me/navigations/Navbar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

interface MeLayoutProps {
  children: React.ReactNode;
}

const MeLayout = async ({ children }: MeLayoutProps) => {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="flex min-h-dvh flex-col gap-20 pb-10">
      <AuthProvider data={data}>
        <Navbar />
        {children}
      </AuthProvider>
    </main>
  );
};

export default MeLayout;
