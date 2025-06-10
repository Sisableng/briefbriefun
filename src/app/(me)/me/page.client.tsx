"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/query/auth-hooks";
import getFirstName from "@/lib/getFirstName";
import React from "react";
import dynamic from "next/dynamic";

const ProjectLists = dynamic(
  () => import("@/components/me/project/ProjectLists"),
  {
    ssr: false,
    loading: () => (
      <div className="auto-fill-72 grid gap-4">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-60" />
        ))}
      </div>
    ),
  },
);

export default function MeHomePage() {
  const { user } = useSession();

  return (
    <div className="cme-content space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-sm space-y-2">
          <h2 className="text-muted-foreground">Wassup 👋</h2>
          <h1 className="">{getFirstName(user?.name)}.</h1>
        </div>

        <p className="text-muted-foreground">
          {new Date().toLocaleDateString("id", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {user && <ProjectLists userId={user.id} />}
    </div>
  );
}
