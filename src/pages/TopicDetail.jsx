import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { findTopic } from "../data/topics";
import { findLesson } from "../data/lessons";
import { badgesForTopic } from "../data/badges";
import { useProgress } from "../context/ProgressContext";
import { useAuth } from "../context/AuthContext";
import { canAccessLesson, isLessonPassed, PASS_THRESHOLD } from "../utils/lessonAccess";
import Card from "../components/Card";
import BilingualText from "../components/BilingualText";
import BadgeIcon from "../components/BadgeIcon";
import Button from "../components/Button";
import styles from "./TopicDetail.module.css";

function TopicDetail() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { progress } = useProgress();
  const { user } = useAuth();
  const isTeacher = user.role === "teacher";

  const topic = findTopic(topicId);

  if (!topic) {
    return (
      <div className={styles.page}>
        <BilingualText as="h1" af="Onderwerp nie gevind nie" en="Topic not found" />
        <Button onClick={() => navigate("/onderwerpe")}>Terug (Back)</Button>
      </div>
    );
  }

  const badges = badgesForTopic(topic.id);

  return (
    <div className={styles.page}>
      <Button variant="ghost" className={styles.back} onClick={() => navigate("/onderwerpe")}>
        &larr; Terug na Onderwerpe (Back to Topics)
      </Button>

      <BilingualText as="h1" af={topic.title} en={topic.englishTitle} />
      <BilingualText
        af={`Kry ten minste ${PASS_THRESHOLD}/10 reg om die volgende les te ontsluit.`}
        en={`Score at least ${PASS_THRESHOLD}/10 to unlock the next lesson.`}
      />

      <div className={styles.list}>
        {badges.map((badge, index) => {
          const lesson = findLesson(topic.id, index);
          const hasContent = Boolean(lesson);
          const isUnlocked = canAccessLesson(progress, topic.id, index, isTeacher);
          const isCompleted = progress.completedLessons.includes(badge.id);
          const passed = isLessonPassed(progress, topic.id, index);
          const score = progress.lessonScores[badge.id];

          let statusLabel = null;
          if (!hasContent) {
            statusLabel = isTeacher ? "Voorskou (Preview)" : "Kom binnekort (Coming soon)";
          } else if (!isUnlocked) {
            statusLabel = `Slaag Les ${index} eers (Pass Lesson ${index} first)`;
          } else if (isCompleted) {
            statusLabel = `${score}/10 ${passed ? "" : "- probeer weer (try again)"}`;
          }

          return (
            <Card
              key={badge.id}
              className={styles.lessonCard}
              locked={!isUnlocked}
              onClick={isUnlocked ? () => navigate(`/onderwerp/${topic.id}/${index}`) : undefined}
            >
              <BadgeIcon badge={badge} unlocked={passed} size={48} label="" />
              <div className={styles.lessonInfo}>
                <BilingualText
                  as="h3"
                  af={hasContent ? lesson.title : `Les ${index + 1}`}
                  en={hasContent ? lesson.englishTitle : `Lesson ${index + 1}`}
                />
              </div>
              {passed && (
                <CheckCircle2 className={styles.status} size={22} aria-label="Voltooi (Completed)" />
              )}
              {statusLabel && <span className={styles.comingSoon}>{statusLabel}</span>}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default TopicDetail;
