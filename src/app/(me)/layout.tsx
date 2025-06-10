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

interface MeLayoutProps {
  children: React.ReactNode;
}

const MeLayout = async ({ children }: MeLayoutProps) => {
  const queryClient = new QueryClient();

  const { data, session, user } = await prefetchSession(
    auth,
    queryClient,
    // @ts-ignore
    await headers(),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex min-h-dvh flex-col gap-10 pb-20 md:gap-20">
        <Navbar />
        {children}
      </main>
    </HydrationBoundary>
  );
};

export default MeLayout;
