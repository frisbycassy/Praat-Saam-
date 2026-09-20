import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import Card from "../components/Card";
import BilingualText from "../components/BilingualText";
import OwlMascot from "../components/OwlMascot";
import styles from "./AuthForm.module.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    login(email);
    navigate("/tuisblad");
  }

  return (
    <div className={styles.page}>
      <Card className={styles.card}>
        <OwlMascot size={110} />
        <BilingualText as="h2" af="Meld aan" en="Log in" />
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
          <Button type="submit">Meld aan (Log in)</Button>
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
