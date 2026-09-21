import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import Card from "../components/Card";
import BilingualText from "../components/BilingualText";
import PhotoPicker from "../components/PhotoPicker";
import Logo from "../components/Logo";
import { TITLES } from "../data/titles";
import styles from "./AuthForm.module.css";

const HEADINGS = {
  teacher: { af: "Registreer as Onderwyser", en: "Sign up as Teacher" },
  learner: { af: "Registreer as Leerder", en: "Sign up as Student" },
};

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") === "teacher" ? "teacher" : "learner";
  const isTeacher = role === "teacher";
  const heading = HEADINGS[role];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await signup({ firstName, lastName, email, role, photoUrl, password });
      navigate("/tuisblad");
    } catch (err) {
      setError(
        err?.message?.includes("already registered") || err?.code === "user_already_exists"
          ? "Hierdie e-pos is klaar geregistreer. (This email is already registered.)"
          : "Kon nie registreer nie. Probeer weer. (Could not sign up. Please try again.)",
      );
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
          <div className={styles.nameRow}>
            {isTeacher ? (
              <div className={styles.field}>
                <label htmlFor="title">Titel (Title)</label>
                <select
                  id="title"
                  required
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                >
                  <option value="" disabled>
                    Kies... (Choose...)
                  </option>
                  {TITLES.map((title) => (
                    <option key={title.value} value={title.value}>
                      {title.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className={styles.field}>
                <label htmlFor="firstName">Naam (Name)</label>
                <input
                  id="firstName"
                  type="text"
                  required
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>
            )}
            <div className={styles.field}>
              <label htmlFor="lastName">Van (Surname)</label>
              <input
                id="lastName"
                type="text"
                required
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
          </div>
          <div className={styles.field}>
            <span>Profielfoto (optioneel) - Profile picture (optional)</span>
            <PhotoPicker
              name={[firstName, lastName].filter(Boolean).join(" ") || "?"}
              photoUrl={photoUrl}
              onChange={setPhotoUrl}
            />
          </div>
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
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Registreer..." : "Registreer (Sign up)"}
          </Button>
        </form>
        <p className={styles.switchLine}>
          Het jy klaar 'n rekening? (Already have an account?){" "}
          <Link to={`/aanmeld?role=${role}`}>Meld aan (Log in)</Link>
        </p>
      </Card>
    </div>
  );
}

export default Signup;
