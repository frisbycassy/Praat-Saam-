import { Volume2 } from "lucide-react";
import styles from "./SpeakButton.module.css";

// Reads Afrikaans text aloud using the browser's built-in speech
// synthesis - no external service or API key needed. If the device has
// no Afrikaans voice installed, the browser falls back to its default
// voice rather than failing.
function SpeakButton({ text, size = 20 }) {
  function handleSpeak() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel(); // stop any speech already playing
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "af-ZA";
    window.speechSynthesis.speak(utterance);
  }

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleSpeak}
      aria-label="Lees hardop (Read aloud)"
    >
      <Volume2 size={size} aria-hidden="true" />
    </button>
  );
}

export default SpeakButton;
