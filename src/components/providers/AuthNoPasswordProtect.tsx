"use client";
import { useListAccounts, useSession } from "@/hooks/query/auth-hooks";
import { redirect, usePathname } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function AuthNoPasswordProtect({ children }: Props) {
  const pathname = usePathname();

  const { data } = useListAccounts();

  const isNoPassword = data && !data?.find((x) => x.provider === "credential");
  const protectPath =
    pathname.includes("/me") && pathname !== "/me/after-oauth";

  if (isNoPassword && protectPath) {
    redirect("/me/after-oauth");
  }

  return children;
}
