import { Link } from "react-router-dom";
import BilingualText from "../components/BilingualText";
import styles from "./AuthForm.module.css";

function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.card} style={{ textAlign: "center" }}>
        <BilingualText as="h1" af="Bladsy nie gevind nie" en="Page not found" />
        <Link to="/">Terug na die tuisblad (Back to home)</Link>
      </div>
    </div>
  );
}

export default NotFound;
