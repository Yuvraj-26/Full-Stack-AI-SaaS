import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


/*
specialist library that uses clsx and tailwind merge
to ensure we have a proper way of adding additional
dynamic classnNames to tailwind elements meaning
they are overidden if already exist, avoiding conflics
*/

 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
