import { SITE } from "../data/constants";

const formatter = new Intl.DateTimeFormat(SITE.locale, {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** Long en-GB date, e.g. "18 February 2026". */
export function formatDate(date: Date): string {
  return formatter.format(date);
}

/** ISO date (yyyy-mm-dd) for the <time datetime> attribute. */
export function toISODate(date: Date): string {
  return date.toISOString().split("T")[0];
}
