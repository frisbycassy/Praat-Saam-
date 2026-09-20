import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import Card from "../components/Card";
import BilingualText from "../components/BilingualText";
import styles from "./AuthForm.module.css";

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("learner");

  function handleSubmit(event) {
    event.preventDefault();
    signup(name, email, role);
    navigate("/tuisblad");
  }

  return (
    <div className={styles.page}>
      <Card className={styles.card}>
        <BilingualText as="h2" af="Registreer" en="Sign up" />
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="name">Naam (Name)</label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
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
