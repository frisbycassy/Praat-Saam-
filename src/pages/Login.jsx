import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import Card from "../components/Card";
import BilingualText from "../components/BilingualText";
import Logo from "../components/Logo";
import styles from "./AuthForm.module.css";

const HEADINGS = {
  teacher: { af: "Onderwyser Meld Aan", en: "Teacher Login" },
  learner: { af: "Leerder Meld Aan", en: "Student Login" },
};

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleHint = searchParams.get("role");
  const heading = HEADINGS[roleHint] || { af: "Meld aan", en: "Log in" };

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate("/tuisblad");
    } catch {
      setError("Verkeerde e-pos of wagwoord. (Incorrect email or password.)");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <Card className={styles.card}>
        <Logo size={90} />
        <BilingualText as="h2" af={heading.af} en={heading.en} />
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email">E-pos (Email)</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Wagwoord (Password)</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Meld aan..." : "Meld aan (Log in)"}
          </Button>
        </form>
        <p className={styles.switchLine}>
          Het jy nie 'n rekening nie? (No account yet?){" "}
          <Link to="/registreer">Registreer (Sign up)</Link>
        </p>
      </Card>
    </div>
  );
}

export default Login;
