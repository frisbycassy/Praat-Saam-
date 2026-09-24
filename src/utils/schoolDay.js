// Tasks are only due Monday to Friday - children don't work weekends.
export function isSchoolDay(date = new Date()) {
  const day = date.getDay();
  return day >= 1 && day <= 5;
}
