import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { findTerm } from "../data/curriculum";
import { useProgress } from "../context/ProgressContext";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import BilingualText from "../components/BilingualText";
import Button from "../components/Button";
import styles from "./ThemeList.module.css";

function ThemeList() {
  const { termId } = useParams();
  const navigate = useNavigate();
  const { progress } = useProgress();
  const { user } = useAuth();
  const isTeacher = user.role === "teacher";
  const term = findTerm(termId);

  if (!term) {
    return (
      <div className={styles.page}>
        <BilingualText as="h1" af="Kwartaal nie gevind nie" en="Term not found" />
        <Button onClick={() => navigate("/kwartale")}>Terug (Back)</Button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Button variant="ghost" className={styles.back} onClick={() => navigate("/kwartale")}>
        &larr; Terug na Kwartale (Back to Terms)
      </Button>

      <BilingualText as="h1" af={term.title} en={term.englishSubtitle} />

      <div className={styles.list}>
        {term.themes.map((theme) => {
          const isCompleted = progress.completedLessons.includes(theme.id);
          const isUnlocked = theme.hasLesson || isTeacher;

          return (
            <Card
              key={theme.id}
              className={styles.themeCard}
              locked={!isUnlocked}
              onClick={isUnlocked ? () => navigate(`/les/${theme.id}`) : undefined}
            >
              <div className={styles.themeInfo}>
                <BilingualText as="h3" af={theme.title} en={theme.englishTitle} />
                <div className={styles.meta}>
                  <span>{theme.weeks}</span>
                  {theme.skillFocus.map((skill) => (
                    <span key={skill} className={styles.tag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              {theme.hasLesson ? (
                isCompleted && (
                  <CheckCircle2 className={styles.status} size={24} aria-label="Voltooi (Completed)" />
                )
              ) : isTeacher ? (
                <span className={styles.comingSoon}>Voorskou (Preview)</span>
              ) : (
                <span className={styles.comingSoon}>Kom binnekort (Coming soon)</span>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default ThemeList;
