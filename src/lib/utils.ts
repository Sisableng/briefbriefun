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

export const getUserInitials = (name: string | null) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export const formatLargeValue = (value: number | null | undefined) => {
  if (value == null || value === undefined) return "N/A";
  if (value < 1000) return value;
  else if (value < 1000000) return `${(value / 1000).toFixed(0)}K`;
  else return `${(value / 1000000).toFixed(0)}M`;
};
