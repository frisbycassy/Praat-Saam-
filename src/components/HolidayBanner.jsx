import { PartyPopper } from "lucide-react";
import { publicHoliday } from "../utils/schoolDay";
import styles from "./HolidayBanner.module.css";

// A small reminder in the top bar that today is a South African public
// holiday (so nothing is due).
function HolidayBanner() {
  const holiday = publicHoliday();
  if (!holiday) return null;
  return (
    <div className={styles.banner} role="status">
      <PartyPopper size={20} aria-hidden="true" />
      <div>
        <strong>Vandag is {holiday.af}! Openbare vakansiedag</strong>
        <span className={styles.en}>
          Today is {holiday.en}! Public holiday - no tasks today
        </span>
      </div>
    </div>
  );
}

export default HolidayBanner;
