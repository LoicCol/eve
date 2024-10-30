import { add, format, isValid } from "date-fns";

export function formatSafeDate(
  date: Date | null | undefined,
  locale: string,
): string {
  if (date && isValid(date)) {
    return new Date(date).toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return "-";
}

export function formatSafeTime(
  time: string | null | undefined,
  date: Date | null | undefined,
): string {
  if (time && date) {
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const dateWithOffset = new Date(date.getTime() + userTimezoneOffset);
    const newDate = add(dateWithOffset, {
      hours: parseInt(time.slice(0, 2)),
      minutes: parseInt(time.slice(3, 5)),
    });
    return format(newDate, "HH:mm");
  }
  return "-";
}

export function getStartOfDay(date: Date): Date {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  return startOfDay;
}
