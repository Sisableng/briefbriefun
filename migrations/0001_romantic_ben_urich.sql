ALTER TYPE "public"."vibe" ADD VALUE 'fun-absurd' BEFORE 'corporate';--> statement-breakpoint
ALTER TYPE "public"."vibe" ADD VALUE 'casual-friendly-non-formal' BEFORE 'startup';--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "vibe" SET DEFAULT 'fun-absurd';