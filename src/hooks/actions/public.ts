"use server";

import { db } from "@/db/drizzle";
import { user } from "@/db/schemas/auth-schema";
import { project } from "@/db/schemas/project-schema";
import { count, eq, desc } from "drizzle-orm";

export const getProjectCountAction = async () => {
  try {
    const [countData] = await db.select({ count: count() }).from(project);

    return countData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserCountAction = async () => {
  try {
    const [countData] = await db.select({ count: count() }).from(user);

    return countData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function getTopUsersWithMostProjects() {
  const topUsers = await db
    .select({
      userId: user.id,
      name: user.name, // assuming user has a name field
      email: user.email, // or whatever identifier you want
      image: user.image, // if you have user images
      projectCount: count(project.id),
    })
    .from(user)
    .leftJoin(project, eq(user.id, project.userId))
    .groupBy(user.id, user.name, user.email, user.image)
    .orderBy(desc(count(project.id)))
    .limit(3);

  return topUsers;
}
