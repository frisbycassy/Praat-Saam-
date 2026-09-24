import { Link } from "react-router-dom";
import { Award, Rocket, CalendarCheck, GraduationCap, User } from "lucide-react";
import Button from "../components/Button";
import BilingualText from "../components/BilingualText";
import Card from "../components/Card";
import Logo from "../components/Logo";
import styles from "./Welcome.module.css";

function Welcome() {
  return (
    <>
      <section className={styles.hero}>
        <Logo size={110} />
        <BilingualText
          as="h1"
          af="Praat Saam! Leer Afrikaans"
          en="Speak Along! Learn Afrikaans"
        />
        <BilingualText
          af="Speletjies, punte en plakkers om jou te help met Graad 4 Afrikaans."
          en="Games, points and stickers to help you with Grade 4 Afrikaans."
        />
        <div className={styles.ctaRow}>
          <Link to="/registreer?role=learner">
            <Button variant="primary">
              <User size={18} /> Leerder Registreer (Student Sign Up)
            </Button>
          </Link>
          <Link to="/registreer?role=teacher">
            <Button variant="primary">
              <GraduationCap size={18} /> Onderwyser Registreer (Teacher Sign Up)
            </Button>
          </Link>
        </div>

        <div className={styles.loginBlock}>
          <BilingualText af="Het jy klaar 'n rekening?" en="Already have an account?" />
          <div className={styles.ctaRow}>
            <Link to="/aanmeld?role=learner">
              <Button variant="secondary">
                <User size={18} /> Leerder Meld Aan (Student Login)
              </Button>
            </Link>
            <Link to="/aanmeld?role=teacher">
              <Button variant="secondary">
                <GraduationCap size={18} /> Onderwyser Meld Aan (Teacher Login)
              </Button>
            </Link>
          </div>
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
          <CalendarCheck size={32} aria-hidden="true" />
          <BilingualText as="h3" af="Daaglikse Take" en="Daily Tasks" />
        </Card>
      </section>
    </>
  );
}

export default Welcome;
