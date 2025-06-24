"use server";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { account, user as userSchema } from "@/db/schemas/auth-schema";

export async function getUser(userId?: string) {
  if (!userId) throw new Error("User not found");

  const [data] = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.id, userId));

  return data;
}

export async function getUserAccounts(userId?: string) {
  if (!userId) throw new Error("User not found");

  const data = await db
    .select({
      providerId: account.providerId,
    })
    .from(account)
    .where(eq(account.userId, userId));

  return data;
}
