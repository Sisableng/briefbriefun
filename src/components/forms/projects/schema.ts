import { z } from "zod";

// Enum schemas matching your pgEnum definitions
export const statusSchema = z.enum(["draft", "inProgress", "completed"]);
export const vibeSchema = z.enum(["fun", "corporate", "casual", "startup"]);

export const projectFormSchema = z.object({
  source: z.enum(["default", "goodbrief"]),
  type: z.string({ message: "Kek nya belum dipilih" }),
  industry: z.string({ message: "Kek nya belum dipilih" }),
  vibe: vibeSchema,
});

// Base project schema (for database inserts/updates)
export const createProjectSchema = z.object({
  userId: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  clientName: z.string().min(1, "Client name is required"),
  type: z.string().min(1, "Type is required"),
  industry: z.string().min(1, "Industry is required"),
  status: statusSchema.default("draft"),
  vibe: vibeSchema.default("fun"),
  deadline: z.string().min(1, "Deadline is required"),
  repoUrl: z.string().url("Must be a valid URL").optional(),
});

// Schema for updating projects (all fields optional except id)
export const updateProjectSchema = z.object({
  id: z.string().uuid("Invalid project ID"),
  userId: z.string().optional(),
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  content: z.string().min(1, "Content is required").optional(),
  clientName: z.string().min(1, "Client name is required").optional(),
  type: z.string().min(1, "Type is required").optional(),
  industry: z.string().min(1, "Industry is required").optional(),
  status: statusSchema.optional(),
  vibe: vibeSchema.optional(),
  deadline: z.string().min(1, "Deadline is required").optional(),
  repoUrl: z.string().url("Must be a valid URL").optional(),
});

// Full project schema (includes all fields from database)
export const projectSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  content: z.string(),
  clientName: z.string(),
  type: z.string(),
  industry: z.string(),
  status: statusSchema,
  vibe: vibeSchema,
  deadline: z.string(),
  repoUrl: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Type inference from schemas
export type CreateProject = z.infer<typeof createProjectSchema>;
export type UpdateProject = z.infer<typeof updateProjectSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ProjectStatus = z.infer<typeof statusSchema>;
export type ProjectVibe = z.infer<typeof vibeSchema>;

// Alternative: If you want to validate deadline as actual date
export const createProjectSchemaWithDateDeadline = createProjectSchema.extend({
  deadline: z.string().datetime("Invalid date format"), // for ISO date strings
  // or z.date() if you're passing Date objects
});

// Schema for query parameters/filters
export const projectQuerySchema = z.object({
  status: statusSchema.optional(),
  vibe: vibeSchema.optional(),
  userId: z.string().optional(),
  clientName: z.string().optional(),
  industry: z.string().optional(),
  limit: z.number().int().positive().max(100).optional(),
  offset: z.number().int().min(0).optional(),
});

export type ProjectQuery = z.infer<typeof projectQuerySchema>;
