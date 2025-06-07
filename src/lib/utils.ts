import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createRandomSeed() {
  return Math.random().toString(36).substring(2);
}

export function capitalize(str?: string): string {
  if (!str) {
    return "";
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}
