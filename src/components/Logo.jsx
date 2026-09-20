import styles from "./Logo.module.css";

// A compact "PS" (Praat Saam) monogram badge - P in brand purple, S in
// brand orange, set in the same rounded heading font used everywhere
// else on the site.
function Logo({ size = 36 }) {
  return (
    <span className={styles.badge} style={{ width: size, height: size, fontSize: size * 0.58 }}>
      <span className={styles.p}>P</span>
      <span className={styles.s}>S</span>
    </span>
  );
}

export default Logo;
