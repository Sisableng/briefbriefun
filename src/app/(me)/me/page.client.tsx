"use client";

import { useSession } from "@/hooks/query/auth-hooks";
import getFirstName from "@/lib/getFirstName";
import React from "react";

export default function MeHomePage() {
  const { user, session } = useSession();
  return (
    <div className="cme-content">
      <div className="max-w-sm space-y-2">
        <h2 className="text-muted-foreground">Wassup 👋</h2>
        <h1 className="">{getFirstName(user?.name)}.</h1>
      </div>

      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
