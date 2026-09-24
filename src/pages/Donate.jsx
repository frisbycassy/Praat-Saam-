import { Heart } from "lucide-react";
import BilingualText from "../components/BilingualText";
import DonationDetails from "../components/DonationDetails";
import styles from "./Donate.module.css";

// The Skenk page: open to anyone (parents don't need an account), and where
// the teacher edits the banking details.
function Donate() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.heart}>
          <Heart size={28} aria-hidden="true" />
        </span>
        <BilingualText as="h1" af="Skenk" en="Donate" />
      </div>
      <DonationDetails />
    </div>
  );
}

export default Donate;
