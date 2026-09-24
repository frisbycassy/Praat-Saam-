import { useNavigate } from "react-router-dom";
import { topics } from "../data/topics";
import { useProgress } from "../context/ProgressContext";
import { useAuth } from "../context/AuthContext";
import { TOPIC_ICONS } from "../utils/topicIcons";
import Card from "../components/Card";
import BilingualText from "../components/BilingualText";
import styles from "./TopicsOverview.module.css";

const LESSONS_PER_TOPIC = 5;

function TopicsOverview() {
  const navigate = useNavigate();
  const { progress } = useProgress();
  const { user } = useAuth();
  const isTeacher = user.role === "teacher";

  return (
    <div className={styles.page}>
      <BilingualText as="h1" af="Onderwerpe" en="Topics" />
      <BilingualText
        af={isTeacher ? "Kies 'n onderwerp om die lesse te bekyk." : "Kies 'n onderwerp om te begin oefen."}
        en={isTeacher ? "Choose a topic to view its lessons." : "Choose a topic to start practising."}
      />

      <div className={styles.grid}>
        {topics.map((topic) => {
          const Icon = TOPIC_ICONS[topic.icon] || TOPIC_ICONS.Medal;
          const completedCount = progress.completedLessons.filter((key) =>
            key.startsWith(`${topic.id}:`),
          ).length;

          return (
            <Card key={topic.id} className={styles.topicCard} onClick={() => navigate(`/onderwerp/${topic.id}`)}>
              <div className={styles.iconCircle} style={{ backgroundColor: topic.colors[4] }}>
                <Icon size={26} aria-hidden="true" />
              </div>
              <div className={styles.topicInfo}>
                <BilingualText as="h3" af={topic.title} en={topic.englishTitle} />
                <span className={styles.progress}>
                  {isTeacher
                    ? `${LESSONS_PER_TOPIC} lesse (lessons)`
                    : `${completedCount} / ${LESSONS_PER_TOPIC} lesse (lessons)`}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default TopicsOverview;
