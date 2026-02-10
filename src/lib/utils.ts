import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseNames(input: string): string[] {
  if (!input) return [];
  return input
    .replace(/،/g, ",") // Normalize Urdu commas to English commas
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name.length > 0);
}
