import { useRef, useState } from "react";
import Avatar from "./Avatar";
import Button from "./Button";
import { AVATAR_ICONS, findAvatarIcon, makeAvatarValue } from "./avatarIcons";
import styles from "./PhotoPicker.module.css";

const MAX_FILE_BYTES = 1.5 * 1024 * 1024; // 1.5MB, keeps the stored picture a sensible size

// Lets someone upload a picture from their device (turned into a data URL,
// a piece of text the browser can show as an image) or, if they don't have
// one, pick one of the built-in animal icons instead.
function PhotoPicker({ name, photoUrl, onChange, size = 72 }) {
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const [showIcons, setShowIcons] = useState(false);
  const chosenIcon = findAvatarIcon(photoUrl);

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_BYTES) {
      setError("Hierdie prent is te groot. Kies een kleiner as 1.5MB. (This picture is too large. Pick one under 1.5MB.)");
      event.target.value = "";
      return;
    }

    setError("");
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  }

  function handlePickIcon(id) {
    onChange(makeAvatarValue(id));
    setShowIcons(false);
  }

  return (
    <div className={styles.wrap}>
      <Avatar name={name} photoUrl={photoUrl} size={size} />
      <div className={styles.buttons}>
        <Button type="button" variant="secondary" onClick={() => inputRef.current.click()}>
          Kies Foto (Choose Photo)
        </Button>
        <Button type="button" variant="secondary" onClick={() => setShowIcons((open) => !open)}>
          Kies 'n Ikoon (Choose an Icon)
        </Button>
        {photoUrl && (
          <Button type="button" variant="ghost" onClick={() => onChange(null)}>
            Verwyder Foto (Remove Photo)
          </Button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          hidden
        />
        {error && <span className={styles.hint}>{error}</span>}
        {showIcons && (
          <div className={styles.iconGrid} role="radiogroup" aria-label="Ikone (Icons)">
            {AVATAR_ICONS.map((icon) => (
              <button
                key={icon.id}
                type="button"
                role="radio"
                aria-checked={chosenIcon?.id === icon.id}
                aria-label={icon.label}
                title={icon.label}
                className={`${styles.iconOption} ${chosenIcon?.id === icon.id ? styles.iconChosen : ""}`}
                onClick={() => handlePickIcon(icon.id)}
              >
                <Avatar name={icon.label} photoUrl={makeAvatarValue(icon.id)} size={52} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotoPicker;
