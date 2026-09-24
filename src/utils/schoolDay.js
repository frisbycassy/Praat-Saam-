// Easter Sunday for a year (Anonymous Gregorian algorithm).
function easterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function keyOf(date) {
  return `${date.getMonth() + 1}-${date.getDate()}`;
}

// South African public holidays for a year, as "month-day" -> Afrikaans name.
// A holiday that lands on a Sunday is observed on the Monday after.
const holidayCache = {};
function holidaysForYear(year) {
  if (holidayCache[year]) return holidayCache[year];
  const easter = easterSunday(year);
  const fromEaster = (days) => new Date(year, easter.getMonth(), easter.getDate() + days);
  const holidays = [
    [new Date(year, 0, 1), "Nuwejaarsdag"],
    [new Date(year, 2, 21), "Menseregtedag"],
    [fromEaster(-2), "Goeie Vrydag"],
    [fromEaster(1), "Gesinsdag"],
    [new Date(year, 3, 27), "Vryheidsdag"],
    [new Date(year, 4, 1), "Werkersdag"],
    [new Date(year, 5, 16), "Jeugdag"],
    [new Date(year, 7, 9), "Nasionale Vrouedag"],
    [new Date(year, 8, 24), "Erfenisdag"],
    [new Date(year, 11, 16), "Versoeningsdag"],
    [new Date(year, 11, 25), "Kersdag"],
    [new Date(year, 11, 26), "Welwillendheidsdag"],
  ];
  const map = {};
  for (const [date, name] of holidays) {
    map[keyOf(date)] = name;
    if (date.getDay() === 0) {
      map[keyOf(new Date(year, date.getMonth(), date.getDate() + 1))] = `${name} (vakansiedag)`;
    }
  }
  holidayCache[year] = map;
  return map;
}

// The Afrikaans name of the South African public holiday on this day, or null.
export function publicHolidayName(date = new Date()) {
  return holidaysForYear(date.getFullYear())[keyOf(date)] ?? null;
}

// Tasks are only due Monday to Friday, and not on public holidays - children
// don't work weekends or holidays.
export function isSchoolDay(date = new Date()) {
  const day = date.getDay();
  return day >= 1 && day <= 5 && !publicHolidayName(date);
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
