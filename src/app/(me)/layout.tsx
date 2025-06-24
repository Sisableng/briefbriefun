import Navbar from "@/components/me/navigations/Navbar";
import React from "react";

import { auth } from "@/lib/auth";
import { prefetchSession } from "@daveyplate/better-auth-tanstack/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { headers } from "next/headers";
import FloatingAddBriefBtn from "@/components/FloatingAddBriefBtn";
import { Metadata } from "next/types";
import AuthNoPasswordProtect from "@/components/providers/AuthNoPasswordProtect";

interface MeLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: "%s | B2f",
    default: "B2f", // a default is required when creating a template
  },
};

const MeLayout = async ({ children }: MeLayoutProps) => {
  const queryClient = new QueryClient();

  await prefetchSession(
    auth,
    queryClient,
    // @ts-ignore
    await headers(),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AuthNoPasswordProtect>
        <main className="flex min-h-dvh flex-col gap-10 pb-20 md:gap-20">
          <Navbar />
          {children}
          <FloatingAddBriefBtn />
        </main>
      </AuthNoPasswordProtect>
    </HydrationBoundary>
  );
};

export default MeLayout;
