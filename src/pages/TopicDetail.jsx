import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { findTopic } from "../data/topics";
import { findLesson } from "../data/lessons";
import { badgesForTopic } from "../data/badges";
import { useProgress } from "../context/ProgressContext";
import { useAuth } from "../context/AuthContext";
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

      <div className={styles.list}>
        {badges.map((badge, index) => {
          const lesson = findLesson(topic.id, index);
          const hasContent = Boolean(lesson);
          const isUnlocked = hasContent || isTeacher;
          const isCompleted = progress.completedLessons.includes(badge.id);

          return (
            <Card
              key={badge.id}
              className={styles.lessonCard}
              locked={!isUnlocked}
              onClick={isUnlocked ? () => navigate(`/onderwerp/${topic.id}/${index}`) : undefined}
            >
              <BadgeIcon badge={badge} unlocked={isCompleted} size={48} label="" />
              <div className={styles.lessonInfo}>
                <BilingualText
                  as="h3"
                  af={hasContent ? lesson.title : `Les ${index + 1}`}
                  en={hasContent ? lesson.englishTitle : `Lesson ${index + 1}`}
                />
              </div>
              {hasContent ? (
                isCompleted && (
                  <CheckCircle2 className={styles.status} size={22} aria-label="Voltooi (Completed)" />
                )
              ) : (
                <span className={styles.comingSoon}>
                  {isTeacher ? "Voorskou (Preview)" : "Kom binnekort (Coming soon)"}
                </span>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default TopicDetail;
