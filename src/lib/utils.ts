import { ProjectStatus } from "@/components/forms/projects/schema";
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

export function getStatus(status: ProjectStatus) {
  switch (status) {
    case "draft":
      return "Draft";
    case "inProgress":
      return "Lagi otw";

    default:
      return "Beres";
  }
}
