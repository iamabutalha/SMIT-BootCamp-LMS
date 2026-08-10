import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with clsx conditionals
 * Compatible with shadcn UI components expecting @/lib/utils
 * @param {...any} inputs - Class names or conditional expressions
 * @returns {string} Clean merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default cn;
