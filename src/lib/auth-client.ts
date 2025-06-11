import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL:
    process.env.BETTER_AUTH_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://b2f.wildanm.my.id"
      : "http://localhost:3028"),
});

type ErrorTypes = Partial<Record<keyof typeof authClient.$ERROR_CODES, string>>;

const errorCodes = {
  INVALID_EMAIL_OR_PASSWORD: "Kek nya email/password! lu salah deh.",
  USER_ALREADY_EXISTS: "Akun lo udah terdaftar, bro!",
  INVALID_PASSWORD: "Password lu salah ngab!",
  UNAUTHORIZED: "Sori, ini butuh Autentikasi!",
} satisfies ErrorTypes & { UNAUTHORIZED?: string };

export const getErrorMessage = (code?: string) => {
  if (code && code in errorCodes) {
    return errorCodes[code as keyof typeof errorCodes];
  }

  // return "Something went wrong. Please try again later";
  return code;
};
