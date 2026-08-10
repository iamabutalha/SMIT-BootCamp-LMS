import { format, parseISO, isValid } from 'date-fns';

/**
 * Format ISO date string or Date object to readable string (e.g. 'Aug 09, 2026')
 * @param {string|Date} dateInput
 * @param {string} formatStr
 * @returns {string}
 */
export function formatDate(dateInput, formatStr = 'MMM dd, yyyy') {
  if (!dateInput) return '-';
  try {
    const date = typeof dateInput === 'string' ? parseISO(dateInput) : dateInput;
    return isValid(date) ? format(date, formatStr) : '-';
  } catch {
    return '-';
  }
}

/**
 * Format user initials from full name
 * @param {string} name
 * @returns {string}
 */
export function getInitials(name) {
  if (!name || typeof name !== 'string') return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Format percentage nicely (e.g. 85.1 -> '85.1%')
 * @param {number} value
 * @param {number} decimals
 * @returns {string}
 */
export function formatPercentage(value, decimals = 1) {
  if (value === undefined || value === null || isNaN(value)) return '0%';
  return `${Number(value).toFixed(decimals)}%`;
}
