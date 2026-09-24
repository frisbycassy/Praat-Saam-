import { findAvatarIcon } from "./avatarIcons";
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

// Shows a learner's photo, or one of the built-in animal icons they picked
// instead ("avatar:<id>"); falls back to their initials on a solid circle.
function Avatar({ name, photoUrl, size = 36 }) {
  const style = { width: size, height: size, fontSize: size * 0.4 };
  const preset = findAvatarIcon(photoUrl);

  let content = getInitials(name);
  if (preset) {
    content = (
      <svg viewBox="0 0 100 100" role="img" aria-label={preset.label}>
        <preset.Icon />
      </svg>
    );
  } else if (photoUrl && !photoUrl.startsWith("avatar:")) {
    content = <img src={photoUrl} alt="" />;
  }

  return (
    <div className={styles.avatar} style={style}>
      {content}
    </div>
  );
}

export default Avatar;
