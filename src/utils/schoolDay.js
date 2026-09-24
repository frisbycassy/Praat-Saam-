// Tasks are only due Monday to Friday - children don't work weekends.
export function isSchoolDay(date = new Date()) {
  const day = date.getDay();
  return day >= 1 && day <= 5;
}

// The user's own calendar day (not UTC), so a new day starts at local midnight.
export function localDateString(date = new Date()) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

// How many school days fall after `lastDate` up to and including `today`.
export function schoolDaysBetween(lastDate, today = localDateString()) {
  const end = new Date(`${today}T00:00:00`);
  const day = new Date(`${lastDate}T00:00:00`);
  day.setDate(day.getDate() + 1);
  let count = 0;
  while (day <= end) {
    if (isSchoolDay(day)) count++;
    day.setDate(day.getDate() + 1);
  }
  return count;
}

// Adds one owed lesson for each school day since the last check. The first
// time (no last date), today counts if it's a school day.
export function rollDueForward(due, today = localDateString()) {
  if (due.lastDate === today) return due;
  if (!due.lastDate) {
    return { owed: due.owed + (isSchoolDay(new Date(`${today}T00:00:00`)) ? 1 : 0), lastDate: today };
  }
  return { owed: due.owed + schoolDaysBetween(due.lastDate, today), lastDate: today };
}

// A streak survives weekends: it only breaks if a whole school day was
// skipped. Returns the streak as it stands today (before any visit today).
export function liveStreak(count, lastActiveDate, today = localDateString()) {
  if (!lastActiveDate) return 0;
  return schoolDaysBetween(lastActiveDate, today) <= 1 ? count : 0;
}
