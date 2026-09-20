import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findTopic } from "../data/topics";
import { findLesson } from "../data/lessons";
import { findBadge } from "../data/badges";
import { useProgress } from "../context/ProgressContext";
import { useAuth } from "../context/AuthContext";
import { canAccessLesson, PASS_THRESHOLD } from "../utils/lessonAccess";
import Card from "../components/Card";
import Button from "../components/Button";
import BilingualText from "../components/BilingualText";
import Quiz from "../components/Quiz";
import BadgeIcon from "../components/BadgeIcon";
import styles from "./Lesson.module.css";

function Lesson() {
  const { topicId, lessonIndex } = useParams();
  const index = Number(lessonIndex);
  const navigate = useNavigate();
  const { progress, completeLesson } = useProgress();
  const { user } = useAuth();
  const isTeacher = user.role === "teacher";

  const [stage, setStage] = useState("intro");
  const [result, setResult] = useState(null);

  const topic = findTopic(topicId);
  const lesson = findLesson(topicId, index);
  const isAccessible = canAccessLesson(progress, topicId, index, isTeacher);

  if (!topic || !lesson || !isAccessible) {
    return (
      <div className={styles.page}>
        <BilingualText
          as="h1"
          af={isAccessible ? "Hierdie les is nog nie gereed nie" : "Jy moet eers die vorige les slaag"}
          en={isAccessible ? "This lesson isn't ready yet" : "You need to pass the previous lesson first"}
        />
        <Button onClick={() => navigate(`/onderwerp/${topicId}`)}>
          Terug na {topic ? topic.title : "Onderwerpe"} (Back)
        </Button>
      </div>
    );
  }

  function handleQuizComplete(correctCount) {
    const summary = completeLesson(topicId, index, correctCount);
    setResult({ correctCount, ...summary });
    setStage("result");
  }

  return (
    <div className={styles.page}>
      <Button variant="ghost" className={styles.back} onClick={() => navigate(`/onderwerp/${topicId}`)}>
        &larr; Terug na {topic.title} (Back)
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
          <BilingualText
            as="h2"
            af={result.correctCount >= PASS_THRESHOLD ? "Goed gedaan!" : "So amper!"}
            en={result.correctCount >= PASS_THRESHOLD ? "Well done!" : "So close!"}
          />
          <p>
            {result.correctCount} / {lesson.questions.length} reg (correct) -{" "}
            <strong>+{result.pointsEarned} punte (points)</strong>
          </p>

          {result.newlyUnlockedBadge && (
            <>
              <BilingualText af="Nuwe Kenteken!" en="New Badge!" />
              <div className={styles.stickerUnlockRow}>
                <BadgeIcon badge={findBadge(result.newlyUnlockedBadge)} unlocked />
              </div>
            </>
          )}

          {result.correctCount < PASS_THRESHOLD && (
            <BilingualText
              af={`Jy het ten minste ${PASS_THRESHOLD}/10 nodig om die volgende les te ontsluit.`}
              en={`You need at least ${PASS_THRESHOLD}/10 to unlock the next lesson.`}
            />
          )}

          <div className={styles.resultActions}>
            {result.correctCount < PASS_THRESHOLD && (
              <Button
                onClick={() => {
                  setStage("intro");
                  setResult(null);
                }}
              >
                Probeer Weer (Try Again)
              </Button>
            )}
            <Button
              variant={result.correctCount < PASS_THRESHOLD ? "secondary" : "primary"}
              onClick={() => navigate(`/onderwerp/${topicId}`)}
            >
              Terug na {topic.title} (Back)
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

export default Lesson;
