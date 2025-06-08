import { db } from "@/db/drizzle";
import { user } from "@/db/schemas/auth-schema";
import { project } from "@/db/schemas/project-schema";
import { eq } from "drizzle-orm";
import React from "react";

export default async function page() {
  //   const data = await db
  //     .select()
  //     .from(project)
  //     .where(eq(project.userId, "BK0hW4G75luwhxkHQgqINt83SJ6rm9ig"));
  const data = await db.select().from(user);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
