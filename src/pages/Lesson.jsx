import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findTopic } from "../data/topics";
import { findLesson } from "../data/lessons";
import { findBadge } from "../data/badges";
import { useProgress } from "../context/ProgressContext";
import { useAuth } from "../context/AuthContext";
import {
  canAccessLesson,
  DAILY_NEW_LESSON_LIMIT,
  isWaitingForTomorrow,
  PASS_THRESHOLD,
  reachedDailyLimit,
} from "../utils/lessonAccess";
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
  const [saveError, setSaveError] = useState(false);
  const [pendingAnswers, setPendingAnswers] = useState(null);

  const topic = findTopic(topicId);
  const lesson = findLesson(topicId, index);
  const isAccessible = canAccessLesson(progress, topicId, index, isTeacher);

  // Only block before starting: passing today's last new lesson mustn't swap
  // the results screen for the "come back tomorrow" message.
  if (!topic || !lesson || (!isAccessible && stage === "intro")) {
    let message = {
      af: "Jy moet eers die vorige les slaag",
      en: "You need to pass the previous lesson first",
    };
    if (!lesson) {
      message = { af: "Hierdie les is nog nie gereed nie", en: "This lesson isn't ready yet" };
    } else if (isWaitingForTomorrow(progress, topicId, index, isTeacher)) {
      message = {
        af: `Jy het vandag klaar ${DAILY_NEW_LESSON_LIMIT} nuwe lesse geslaag. Mooi so! Kom môre terug vir hierdie een.`,
        en: `You've already passed ${DAILY_NEW_LESSON_LIMIT} new lessons today. Well done! Come back tomorrow for this one.`,
      };
    }
    return (
      <div className={styles.page}>
        <BilingualText as="h1" af={message.af} en={message.en} />
        <Button onClick={() => navigate(`/onderwerp/${topicId}`)}>
          Terug na {topic ? topic.title : "Onderwerpe"} (Back)
        </Button>
      </div>
    );
  }

  // The database marks the answers and saves the points; the results screen
  // shows once it has replied.
  async function handleQuizComplete(answers) {
    setPendingAnswers(answers);
    setSaveError(false);
    setStage("saving");
    try {
      setResult(await completeLesson(topicId, index, answers));
      setStage("result");
    } catch (error) {
      console.warn("Could not save the lesson.", error);
      setSaveError(true);
    }
  }

  return (
    <div className={styles.page}>
      <Button variant="accent" className={styles.back} onClick={() => navigate(`/onderwerp/${topicId}`)}>
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

          {isTeacher ? (
            <Card className={styles.section}>
              <BilingualText
                as="h3"
                af="Vasvraag (Onderwyser-aansig)"
                en="Quiz questions (teacher view - the correct answer is highlighted)"
              />
              <ol className={styles.questionList}>
                {lesson.questions.map((question) => (
                  <li key={question.af} className={styles.questionItem}>
                    <span className={styles.questionText}>{question.af}</span>
                    <ul className={styles.optionList}>
                      {question.options.map((option, optionIndex) => (
                        <li
                          key={option}
                          className={optionIndex === question.correctIndex ? styles.correctOption : undefined}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </Card>
          ) : (
            <Button onClick={() => setStage("quiz")}>Begin Vasvra (Start Quiz)</Button>
          )}
        </>
      )}

      {stage === "quiz" && (
        <Card>
          <Quiz questions={lesson.questions} onComplete={handleQuizComplete} />
        </Card>
      )}

      {stage === "saving" && (
        <Card className={styles.resultCard}>
          {saveError ? (
            <>
              <BilingualText
                af="Kon nie jou antwoorde stoor nie. Kyk of jy aanlyn is en probeer weer."
                en="Couldn't save your answers. Check that you're online and try again."
              />
              <Button onClick={() => handleQuizComplete(pendingAnswers)}>
                Probeer Weer (Try Again)
              </Button>
            </>
          ) : (
            <BilingualText af="Merk jou antwoorde..." en="Marking your answers..." />
          )}
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

          {result.newlyUnlockedBadge && reachedDailyLimit(progress) && (
            <BilingualText
              af={`Dis jou ${DAILY_NEW_LESSON_LIMIT} nuwe lesse vir vandag! Kom môre terug vir meer.`}
              en={`That's your ${DAILY_NEW_LESSON_LIMIT} new lessons for today! Come back tomorrow for more.`}
            />
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

// Keyed by the lesson so moving straight to another lesson starts fresh
// instead of keeping the previous lesson's quiz or results.
function LessonPage() {
  const { topicId, lessonIndex } = useParams();
  return <Lesson key={`${topicId}:${lessonIndex}`} />;
}

export default LessonPage;
