import styles from "./Avatar.module.css";

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// Shows a learner's photo once one exists (once accounts support uploads);
// falls back to their initials on a solid circle until then.
function Avatar({ name, photoUrl, size = 36 }) {
  const style = { width: size, height: size, fontSize: size * 0.4 };

  return (
    <div className={styles.avatar} style={style}>
      {photoUrl ? <img src={photoUrl} alt="" /> : getInitials(name)}
    </div>
  );
}

export default Avatar;
