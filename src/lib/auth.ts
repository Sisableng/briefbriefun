import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { authSchema } from "@/db/schemas/auth-schema";
import { nextCookies } from "better-auth/next-js";
import { compare, genSalt, hash } from "bcrypt-ts";

export const auth = betterAuth({
  appName: "BriefBriefun",
  plugins: [nextCookies()],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    password: {
      async hash(password) {
        const salt = await genSalt(12);
        const result = await hash(password, salt);
        return result;
      },
      async verify(data) {
        return await compare(data.password, data.hash);
      },
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  onAPIError: {
    throw: true,
  },
});
