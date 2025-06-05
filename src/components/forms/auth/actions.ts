"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";

export type Authentication = {
  email: string;
  password: string;
  name: string;
  image: string;
};

export const signin = async (value: Omit<Authentication, "name" | "image">) => {
  try {
    await auth.api.signInEmail({
      body: {
        email: value.email,
        password: value.password,
        callbackURL: "/me",
      },
      headers: await headers(),
    });
  } catch (error) {
    console.error("server", error);
    if (error instanceof APIError) {
      return { error };
    }
  }
};

export const signup = async (value: Authentication) => {
  try {
    await auth.api.signUpEmail({
      body: {
        name: value.name,
        email: value.email,
        password: value.password,

        callbackURL: "/me",
      },
      headers: await headers(),
    });
  } catch (error) {
    console.error("server", error);
    if (error instanceof APIError) {
      return { error };
    }
  }
};

export const setPassword = async (newPassword: string) => {
  try {
    await auth.api.setPassword({
      body: { newPassword: newPassword },
      headers: await headers(),
    });
  } catch (error) {
    if (error instanceof APIError) {
      return { error };
    }
  }
};
