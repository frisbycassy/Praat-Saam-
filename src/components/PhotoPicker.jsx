import { useRef, useState } from "react";
import Avatar from "./Avatar";
import Button from "./Button";
import styles from "./PhotoPicker.module.css";

const MAX_FILE_BYTES = 1.5 * 1024 * 1024; // 1.5MB, keeps it well within local storage's limit

// Lets someone pick an image from their computer and turns it into a
// data URL (a piece of text the browser can show as an image). This is a
// placeholder for real photo uploads, which will come once accounts move
// to Supabase and can store files properly instead of local storage.
function PhotoPicker({ name, photoUrl, onChange, size = 72 }) {
  const inputRef = useRef(null);
  const [error, setError] = useState("");

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

  return (
    <div className={styles.wrap}>
      <Avatar name={name} photoUrl={photoUrl} size={size} />
      <div className={styles.buttons}>
        <Button type="button" variant="secondary" onClick={() => inputRef.current.click()}>
          Kies Foto (Choose Photo)
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
      </div>
    </div>
  );
}

export default PhotoPicker;
