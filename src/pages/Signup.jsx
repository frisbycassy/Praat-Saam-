import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import Card from "../components/Card";
import BilingualText from "../components/BilingualText";
import PhotoPicker from "../components/PhotoPicker";
import styles from "./AuthForm.module.css";

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("learner");
  const [photoUrl, setPhotoUrl] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    signup({ firstName, lastName, nickname, email, role, username, photoUrl });
    navigate("/tuisblad");
  }

  return (
    <div className={styles.page}>
      <Card className={styles.card}>
        <BilingualText as="h2" af="Registreer" en="Sign up" />
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.nameRow}>
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
            <label htmlFor="nickname">Bynaam (Nickname) - opsioneel (optional)</label>
            <input
              id="nickname"
              type="text"
              placeholder="bv. Miss. Frisby"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="username">Gebruikersnaam (Username)</label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className={styles.field}>
            <span>Profielfoto (optioneel) - Profile picture (optional)</span>
            <PhotoPicker
              name={[firstName, lastName].filter(Boolean).join(" ") || nickname || "?"}
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className={styles.field}>
            <span id="role-label">Ek is 'n... (I am a...)</span>
            <div className={styles.roleRow} role="radiogroup" aria-labelledby="role-label">
              <Button
                type="button"
                variant={role === "learner" ? "primary" : "secondary"}
                onClick={() => setRole("learner")}
              >
                Leerder (Learner)
              </Button>
              <Button
                type="button"
                variant={role === "teacher" ? "primary" : "secondary"}
                onClick={() => setRole("teacher")}
              >
                Onderwyser (Teacher)
              </Button>
            </div>
          </div>
          <Button type="submit">Registreer (Sign up)</Button>
        </form>
        <p className={styles.switchLine}>
          Het jy klaar 'n rekening? (Already have an account?){" "}
          <Link to="/aanmeld">Meld aan (Log in)</Link>
        </p>
      </Card>
    </div>
  );
}

export default Signup;
