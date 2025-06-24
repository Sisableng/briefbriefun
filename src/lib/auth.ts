import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { authSchema } from "@/db/schemas/auth-schema";
import { nextCookies } from "better-auth/next-js";
import { compare, genSalt, hash } from "bcrypt-ts";
import { createAuthMiddleware, APIError } from "better-auth/api";

export const auth = betterAuth({
  appName: "BriefBriefun",
  plugins: [nextCookies()],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  trustedOrigins: ["http://localhost:3028", "https://b2f.wildanm.my.id"],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      allowDifferentEmails: true,
      allowUnlinkingAll: true,
      trustedProviders: ["google", "github"],
    },
  },
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
    // autoSignIn: true,
    // revokeSessionsOnPasswordReset: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      // prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  databaseHooks: {
    session: {
      create: {
        async before(session) {
          const res = await fetch("https://ipinfo.io/json");
          const locationData = await res.json();

          return {
            data: {
              ...session,
              ipAddress: locationData.ip ?? null,
            },
          };
        },
      },
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      const response = ctx.context.returned as APIError;
      if (response && response.body) {
        if (response.body?.code === "USER_ALREADY_EXISTS") {
          throw new APIError("BAD_REQUEST", {
            ...response.body,
            message: "USER_ALREADY_EXISTS", // account already exists
          });
        }
        if (response.body?.code === "INVALID_EMAIL_OR_PASSWORD") {
          throw new APIError("UNAUTHORIZED", {
            ...response.body,
            message: "INVALID_EMAIL_OR_PASSWORD",
          });
        }
        if (response.body?.code === "INVALID_EMAIL") {
          throw new APIError("UNAUTHORIZED", {
            ...response.body,
            message: "INVALID_EMAIL",
          });
        }
        if (response.body?.code === "INVALID_PASSWORD") {
          throw new APIError("BAD_REQUEST", {
            ...response.body,
            message: "INVALID_PASSWORD",
          });
        }
      }
    }),
  },
  advanced: {
    ipAddress: {
      ipAddressHeaders: [
        "x-forwarded-for",
        "x-vercel-forwarded-for",
        "x-real-ip",
        "x-client-ip",
      ],
      disableIpTracking: false,
    },
  },
});
