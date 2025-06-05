import { createAuthClient } from "better-auth/react";
import { auth } from "./auth";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3028",
});

type ErrorTypes = Partial<Record<keyof typeof auth.$ERROR_CODES, string>>;

const errorCodes = {
  INVALID_EMAIL_OR_PASSWORD: "Kek nya email/password! lu salah deh.",
  USER_ALREADY_EXISTS: "Akun lo udah terdaftar, bro!",
} satisfies ErrorTypes;

export const getErrorMessage = (code?: string) => {
  if (code && code in errorCodes) {
    return errorCodes[code as keyof typeof errorCodes];
  }

  // return "Something went wrong. Please try again later";
  return code;
};
