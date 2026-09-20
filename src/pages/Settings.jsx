import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Card from "../components/Card";
import Button from "../components/Button";
import BilingualText from "../components/BilingualText";
import styles from "./Settings.module.css";

function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.page}>
      <BilingualText as="h1" af="Instellings" en="Settings" />

      <Card className={styles.section}>
        <BilingualText as="h3" af="Tema" en="Theme" />
        <div className={styles.themeRow}>
          <Button variant={theme === "light" ? "primary" : "secondary"} onClick={toggleTheme}>
            <Sun size={18} /> Lig (Light)
          </Button>
          <Button variant={theme === "dark" ? "primary" : "secondary"} onClick={toggleTheme}>
            <Moon size={18} /> Donker (Dark)
          </Button>
        </div>
      </Card>

      <Card className={styles.section}>
        <BilingualText as="h3" af="Redigeerder-instellings" en="Editor Settings" />
        <p className={styles.note}>
          Hier sal onderwysers binnekort lesse kan skep en wysig. (Teachers will
          soon be able to create and edit lessons here.)
        </p>
      </Card>
    </div>
  );
}

export default Settings;
