import { useQuery } from "@tanstack/react-query";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { user as userSchema } from "@/db/schemas/auth-schema";

export const useUser = (userId?: string) => {
  return useQuery({
    queryKey: ["db-user", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User not found");

      const [data] = await db
        .select()
        .from(userSchema)
        .where(eq(userSchema.id, userId));

      return data;
    },
  });
};
