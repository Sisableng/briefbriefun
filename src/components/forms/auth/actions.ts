"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";

type Authentication = {
  email: string;
  password: string;
  name: string;
};

export const signin = async (value: Omit<Authentication, "name">) => {
  try {
    await auth.api.signInEmail({
      body: {
        email: value.email,
        password: value.password,
        callbackURL: "/me",
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      return { error };
    }
  }
};

export const signinSocial = async (provider: "google" | "github") => {
  await auth.api.signInSocial({
    body: {
      provider,
      callbackURL: "/me",
      errorCallbackURL: "/social-error",
      newUserCallbackURL: "/me",
    },
  });
};

export const signup = async (value: Authentication) => {
  await auth.api.signUpEmail({
    body: {
      name: value.name,
      email: value.email,
      password: value.password,
      callbackURL: "/me",
    },
  });
};
