import { PartyPopper } from "lucide-react";
import { publicHolidayName } from "../utils/schoolDay";
import styles from "./HolidayBanner.module.css";

// A reminder that today is a South African public holiday (nothing is due).
function HolidayBanner() {
  const name = publicHolidayName();
  if (!name) return null;
  return (
    <div className={styles.banner} role="status">
      <PartyPopper size={28} aria-hidden="true" />
      <div>
        <strong>Vandag is 'n openbare vakansiedag: {name}!</strong>
        <p className={styles.note}>Geen take vandag nie. Geniet die vakansie!</p>
      </div>
    </div>
  );
}

export default HolidayBanner;
