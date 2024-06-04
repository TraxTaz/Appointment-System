import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateToHHMMFormatter(date: Date) {
  const hours = date.getHours().toString().padStart( 2, '0')
  const minutes = date.getMinutes().toString().padStart( 2, '0')

  return `${hours}:${minutes}`
}

export function extractEmplId(value: string): number {
  return Number(value.split(' - ')[0])
}