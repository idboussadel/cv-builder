import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMonthYear = (date: Date | undefined) => {
  if (!date) return "";
  const options = { year: "numeric", month: "long" } as const;
  return date.toLocaleDateString(undefined, options);
};

export const formatEndDate = (date: Date | undefined) => {
  const today = new Date();
  if (date && date.toDateString() === today.toDateString()) {
    return "Present";
  }
  return formatMonthYear(date);
};
