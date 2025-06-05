"use client";

import { AuthQueryProvider } from "@daveyplate/better-auth-tanstack";

export default function AuthProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthQueryProvider>{children}</AuthQueryProvider>;
}
