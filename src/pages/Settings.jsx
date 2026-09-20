import Card from "../components/Card";
import BilingualText from "../components/BilingualText";
import styles from "./Settings.module.css";

function Settings() {
  return (
    <div className={styles.page}>
      <BilingualText as="h1" af="Instellings" en="Settings" />

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
