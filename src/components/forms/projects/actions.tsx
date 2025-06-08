"use server";

import { db } from "@/db/drizzle";
import { eq, and, SQL, desc } from "drizzle-orm";
import { project } from "@/db/schemas/project-schema";
import { z } from "zod";
import { createProjectSchema, ProjectStatus } from "./schema";

export const getProjectCountAction = async (userId?: string) => {
  try {
    if (!userId) throw new Error("User not found");

    const count = await db.$count(project);

    return count;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProjectAction = async (
  userId?: string,
  options?: {
    page?: number;
    pageSize?: number;
  },
) => {
  try {
    if (!userId) throw new Error("User not found");

    const filters: SQL[] = [];

    filters.push(eq(project.userId, userId));

    let query = db
      .select()
      .from(project)
      .where(and(...filters))
      .orderBy(desc(project.createdAt))
      .$dynamic();

    if (options?.pageSize) {
      query = query.limit(options.pageSize);
    }

    if (options?.page && options?.pageSize) {
      query = query.offset((options?.page - 1) * options?.pageSize);
    }

    const data = await query;

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createProjectAction = async (
  data: z.infer<typeof createProjectSchema>,
) => {
  const newProject = createProjectSchema.parse(data);

  await db.insert(project).values(newProject);
};

export const updateProjectAction = async (data: {
  status: ProjectStatus;
  projectId: string;
}) => {
  await db
    .update(project)
    .set({
      status: data.status,
    })
    .where(eq(project.id, data.projectId));
};

export const deleteProjectAction = async (projectId: string) => {
  await db.delete(project).where(eq(project.id, projectId));
};
