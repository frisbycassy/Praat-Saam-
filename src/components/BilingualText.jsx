import styles from "./BilingualText.module.css";

// Shows Afrikaans text with a smaller English translation underneath.
// Used everywhere in the app so every bilingual label looks the same.
// `as` lets a heading level (h1, h2...) be used instead of a paragraph.
function BilingualText({ af, en, as: Tag = "p", className = "" }) {
  return (
    <div className={`${styles.wrap} ${className}`}>
      <Tag className={styles.af}>{af}</Tag>
      {en && <p className={styles.en}>{en}</p>}
    </div>
  );
}

export default BilingualText;
