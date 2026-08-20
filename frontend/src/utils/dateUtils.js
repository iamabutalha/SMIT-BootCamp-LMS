/**
 * Formats a date string or Date object into clean DMY (Day/Month/Year) format (e.g. 20/08/2026).
 */
export function formatDMY(dateInput, separator = "/") {
  if (!dateInput) return "N/A";

  const str = String(dateInput).trim();
  const d = new Date(str);

  if (!Number.isNaN(d.getTime())) {
    // For ISO strings ending with T or Z, use UTC parts to avoid local timezone offset shifting
    const isISO = str.includes("T") || str.endsWith("Z");
    const day = String(isISO ? d.getUTCDate() : d.getDate()).padStart(2, "0");
    const month = String((isISO ? d.getUTCMonth() : d.getMonth()) + 1).padStart(2, "0");
    const year = isISO ? d.getUTCFullYear() : d.getFullYear();
    return `${day}${separator}${month}${separator}${year}`;
  }

  // Fallback parsing for unparseable formatted date strings
  const parts = str.split(/[/.-]/);
  if (parts.length >= 3) {
    if (parts[0].length === 4) {
      const year = parts[0];
      const month = parts[1].padStart(2, "0");
      const day = parts[2].substring(0, 2).padStart(2, "0");
      return `${day}${separator}${month}${separator}${year}`;
    }
    if (parseInt(parts[0]) <= 12 && parseInt(parts[1]) > 0) {
      const day = parts[1].padStart(2, "0");
      const month = parts[0].padStart(2, "0");
      const year = parts[2].substring(0, 4);
      return `${day}${separator}${month}${separator}${year}`;
    }
  }

  return str;
}
