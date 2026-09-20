import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findTheme } from "../data/curriculum";
import { findLesson } from "../data/lessons";
import { findBadge } from "../data/badges";
import { useProgress } from "../context/ProgressContext";
import Card from "../components/Card";
import Button from "../components/Button";
import BilingualText from "../components/BilingualText";
import Quiz from "../components/Quiz";
import BadgeIcon from "../components/BadgeIcon";
import styles from "./Lesson.module.css";

function Lesson() {
  const { themeId } = useParams();
  const navigate = useNavigate();
  const { completeLesson } = useProgress();

  const [stage, setStage] = useState("intro");
  const [result, setResult] = useState(null);

  const found = findTheme(themeId);
  const lesson = findLesson(themeId);

  if (!found || !lesson) {
    return (
      <div className={styles.page}>
        <BilingualText
          as="h1"
          af="Hierdie les is nog nie gereed nie"
          en="This lesson isn't ready yet"
        />
        <Button onClick={() => navigate("/kwartale")}>Terug na Kwartale (Back to Terms)</Button>
      </div>
    );
  }

  function handleQuizComplete(correctCount) {
    const summary = completeLesson(themeId, correctCount, lesson.questions.length);
    setResult({ correctCount, ...summary });
    setStage("result");
  }

  return (
    <div className={styles.page}>
      <Button variant="ghost" className={styles.back} onClick={() => navigate(`/kwartale/${found.term.id}`)}>
        &larr; Terug na Temas (Back to Themes)
      </Button>

      <BilingualText as="h1" af={lesson.title} en={lesson.englishTitle} />

      {stage === "intro" && (
        <>
          <Card className={styles.section}>
            <BilingualText as="h3" af="Nuwe Woorde" en="New Words" />
            <ul className={styles.vocabList}>
              {lesson.vocabulary.map((word) => (
                <li key={word.af} className={styles.vocabItem}>
                  <span>{word.af}</span>
                  <span className={styles.en}>{word.en}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className={styles.section}>
            <BilingualText as="h3" af="Lees Hierdie" en="Read This" />
            <p className={styles.passage}>{lesson.passage.af}</p>
            <p className={`${styles.passage} ${styles.enText}`}>{lesson.passage.en}</p>
          </Card>

          <Button onClick={() => setStage("quiz")}>Begin Vasvra (Start Quiz)</Button>
        </>
      )}

      {stage === "quiz" && (
        <Card>
          <Quiz questions={lesson.questions} onComplete={handleQuizComplete} />
        </Card>
      )}

      {stage === "result" && result && (
        <Card className={styles.resultCard}>
          <BilingualText as="h2" af="Goed gedaan!" en="Well done!" />
          <p>
            {result.correctCount} / {lesson.questions.length} reg (correct) -{" "}
            <strong>+{result.pointsEarned} punte (points)</strong>
          </p>

          {result.newlyUnlockedBadges.length > 0 && (
            <>
              <BilingualText af="Nuwe Kenteken!" en="New Badge!" />
              <div className={styles.badgeUnlockRow}>
                {result.newlyUnlockedBadges.map((badgeId) => (
                  <BadgeIcon key={badgeId} badge={findBadge(badgeId)} unlocked />
                ))}
              </div>
            </>
          )}

          <Button onClick={() => navigate(`/kwartale/${found.term.id}`)}>
            Terug na Temas (Back to Themes)
          </Button>
        </Card>
      )}
    </div>
  );
}

export default Lesson;
