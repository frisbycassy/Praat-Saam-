import { Link, Navigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { topics } from "../data/topics";
import { findLesson } from "../data/lessons";
import { canAccessLesson, isLessonPassed, PASS_THRESHOLD } from "../utils/lessonAccess";
import { isSchoolDay } from "../utils/schoolDay";
import Card from "../components/Card";
import BilingualText from "../components/BilingualText";
import styles from "./DueToday.module.css";

const LESSONS_PER_TOPIC = 5;

// The next lesson a learner can open in each topic (unlocked, not yet passed).
function nextLessonsToDo(progress) {
  const next = [];
  for (const topic of topics) {
    for (let index = 0; index < LESSONS_PER_TOPIC; index++) {
      if (!findLesson(topic.id, index)) continue;
      if (!canAccessLesson(progress, topic.id, index, false)) continue;
      if (isLessonPassed(progress, topic.id, index)) continue;
      next.push({ topic, index, lesson: findLesson(topic.id, index) });
      break;
    }
  }
  return next;
}

function DueToday() {
  const { user } = useAuth();
  const { progress, isReady } = useProgress();

  if (user.role === "teacher") return <Navigate to="/tuisblad" replace />;
  if (!isReady) return null;

  const owed = progress.due.owed;
  const choices = nextLessonsToDo(progress);
  const today = new Date().getDay();
  const nextIsMonday = today === 5 || today === 6 || today === 0;
  const schoolDay = isSchoolDay();
  const dueNow = schoolDay && owed > 0;

  return (
    <div className={styles.page}>
      <BilingualText as="h1" af="Take" en="Tasks" />

      <Card className={styles.summary}>
        {!schoolDay && owed > 0 ? (
          <>
            <CheckCircle2 size={44} className={styles.done} aria-hidden="true" />
            <BilingualText
              af={`Geen take oor die naweek nie! Jou ${owed === 1 ? "les wag" : `${owed} lesse wag`} vir jou Maandag.`}
              en={`No tasks over the weekend! ${owed === 1 ? "Your lesson is" : `Your ${owed} lessons are`} waiting for Monday.`}
            />
          </>
        ) : dueNow ? (
          <>
            <span className={styles.count}>{owed}</span>
            <BilingualText
              af={owed === 1 ? "les is verskuldig" : "lesse is verskuldig"}
              en={owed === 1 ? "lesson is due" : "lessons are due"}
            />
            {owed > 1 && (
              <p className={styles.note}>
                Jy het 'n dag gemis, so die lesse tel op. (You missed a day, so the lessons add
                up.)
              </p>
            )}
            <p className={styles.note}>
              Slaag 'n nuwe les met ten minste {PASS_THRESHOLD}/10 om een af te merk. (Pass a new
              lesson with at least {PASS_THRESHOLD}/10 to tick one off.)
            </p>
          </>
        ) : (
          <>
            <CheckCircle2 size={44} className={styles.done} aria-hidden="true" />
            <BilingualText
              af={`Jy is klaar vir vandag! Kom ${nextIsMonday ? "Maandag" : "môre"} terug.`}
              en={`You're all done for today! Come back ${nextIsMonday ? "on Monday" : "tomorrow"}.`}
            />
          </>
        )}
      </Card>

      <BilingualText
        as="h3"
        af={dueNow ? "Kies 'n les" : "Wil jy meer doen?"}
        en={dueNow ? "Pick a lesson" : "Want to do more?"}
      />

      {choices.length === 0 ? (
        <Link to="/onderwerpe" className={styles.choice}>
          <BilingualText
            af="Jy het al die lesse geslaag! Oefen weer by Onderwerpe."
            en="You've passed every lesson! Practise again in Topics."
          />
        </Link>
      ) : (
        <div className={styles.list}>
          {choices.map(({ topic, index, lesson }) => (
            <Link key={topic.id} to={`/onderwerp/${topic.id}/${index}`} className={styles.choice}>
              <span className={styles.topic}>
                {topic.title} - Les {index + 1}
              </span>
              <BilingualText af={lesson.title} en={lesson.englishTitle} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default DueToday;
