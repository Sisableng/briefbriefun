import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { relations } from "drizzle-orm";

export const statusEnum = pgEnum("status", [
  "draft",
  "inProgress",
  "completed",
]);

export const vibeEnum = pgEnum("vibe", [
  "fun",
  "corporate",
  "casual",
  "startup",
]);

export const project = pgTable("project", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id"),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content").notNull(),

  clientName: text("client_name").notNull(),
  type: text("type").notNull(),
  industry: text("industry").notNull(),
  status: statusEnum().default("draft"),
  vibe: vibeEnum().default("fun"),
  deadline: text("deadline").notNull(),
  repoUrl: text("repo_url"),

  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const usersRelations = relations(user, ({ many }) => ({
  projects: many(project),
}));

export const projectRelations = relations(project, ({ one }) => ({
  user: one(user, {
    fields: [project.userId],
    references: [user.id],
  }),
}));
