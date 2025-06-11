"use server";

import { db } from "@/db/drizzle";
import { eq, and, SQL, desc, count, ilike } from "drizzle-orm";
import { project } from "@/db/schemas/project-schema";
import { z } from "zod";
import { createProjectSchema, ProjectStatus } from "./schema";

export type ProjectQueryOptions = {
  projectId?: string;
  page?: number;
  pageSize?: number;
  filters?: {
    type?: string;
    industry?: string;
    title?: string;
    status?: ProjectStatus;
  };
  withCount?: boolean;
};

// Reusable function to generate filters
const generateFilters = (
  userId: string,
  filterOptions?: ProjectQueryOptions["filters"],
  projectId?: string,
): SQL[] => {
  const filters: SQL[] = [];

  // Add userId filter
  filters.push(eq(project.userId, userId));

  // Add projectId filter if provided
  if (projectId) {
    filters.push(eq(project.id, projectId));
  }

  // Dynamic filter building
  if (filterOptions) {
    Object.entries(filterOptions).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        switch (key) {
          case "type":
            filters.push(eq(project.type, value));
            break;
          case "industry":
            filters.push(eq(project.industry, value));
            break;
          case "status":
            filters.push(eq(project.status, value as ProjectStatus));
            break;
          case "title":
            filters.push(ilike(project.title, `%${value}%`));
            break;
          // Add more filter cases as needed
          default:
            break;
        }
      }
    });
  }

  return filters;
};

export const getProjectCountAction = async (
  userId?: string,
  options?: Pick<ProjectQueryOptions, "filters">,
) => {
  try {
    if (!userId) throw new Error("User not found");

    const filters = generateFilters(userId, options?.filters);

    const [countData] = await db
      .select({ count: count() })
      .from(project)
      .where(and(...filters));

    return countData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProjectAction = async (
  userId?: string,
  options?: ProjectQueryOptions,
) => {
  try {
    if (!userId) throw new Error("User not found");

    const filters = generateFilters(
      userId,
      options?.filters,
      options?.projectId,
    );

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
