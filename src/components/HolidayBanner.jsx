import { PartyPopper, Sun } from "lucide-react";
import { publicHoliday } from "../utils/schoolDay";
import styles from "./HolidayBanner.module.css";

const WEEKEND_DAYS = {
  6: { af: "Saterdag", en: "Saturday" },
  0: { af: "Sondag", en: "Sunday" },
};

// A small reminder in the top bar that today is a day off - a South African
// public holiday or the weekend - so no lessons are due.
function HolidayBanner() {
  const holiday = publicHoliday();
  const weekend = WEEKEND_DAYS[new Date().getDay()];
  if (!holiday && !weekend) return null;

  return (
    <div className={styles.banner} role="status">
      {holiday ? (
        <PartyPopper size={20} aria-hidden="true" />
      ) : (
        <Sun size={20} aria-hidden="true" />
      )}
      <div>
        {holiday ? (
          <>
            <strong>Vandag is {holiday.af}! Openbare vakansiedag</strong>
            <span className={styles.en}>
              Today is {holiday.en}! Public holiday - no tasks today
            </span>
          </>
        ) : (
          <>
            <strong>Dis {weekend.af}! Geen lesse vandag nie</strong>
            <span className={styles.en}>It&apos;s {weekend.en}! No lessons due today</span>
          </>
        )}
      </div>
    </div>
  );
}

export default HolidayBanner;
