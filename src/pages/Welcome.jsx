import { Link } from "react-router-dom";
import { Award, Rocket, PartyPopper } from "lucide-react";
import Button from "../components/Button";
import BilingualText from "../components/BilingualText";
import Card from "../components/Card";
import styles from "./Welcome.module.css";

function Welcome() {
  return (
    <>
      <section className={styles.hero}>
        <BilingualText
          as="h1"
          af="Praat Saam! Leer Afrikaans"
          en="Speak Along! Learn Afrikaans"
        />
        <BilingualText
          af="Speletjies, punte en kentekens om jou te help met Graad 4 Afrikaans."
          en="Games, points and badges to help you with Grade 4 Afrikaans."
        />
        <div className={styles.ctaRow}>
          <Link to="/registreer">
            <Button variant="primary">Registreer (Sign up)</Button>
          </Link>
          <Link to="/aanmeld">
            <Button variant="secondary">Meld aan (Log in)</Button>
          </Link>
        </div>
      </section>

      <section className={styles.features}>
        <Card className={styles.featureCard}>
          <Rocket size={32} aria-hidden="true" />
          <BilingualText as="h3" af="Vlakke" en="Levels" />
        </Card>
        <Card className={styles.featureCard}>
          <Award size={32} aria-hidden="true" />
          <BilingualText as="h3" af="Kentekens" en="Badges" />
        </Card>
        <Card className={styles.featureCard}>
          <PartyPopper size={32} aria-hidden="true" />
          <BilingualText as="h3" af="Pret Speletjies" en="Fun Games" />
        </Card>
      </section>
    </>
  );
}

export default Welcome;
