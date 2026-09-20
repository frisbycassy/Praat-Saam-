import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { topics } from "../data/topics";
import { useProgress } from "../context/ProgressContext";
import { TOPIC_ICONS } from "../utils/topicIcons";
import Card from "../components/Card";
import BilingualText from "../components/BilingualText";
import styles from "./TopicsOverview.module.css";

function TopicsOverview() {
  const navigate = useNavigate();
  const { progress } = useProgress();

  return (
    <div className={styles.page}>
      <BilingualText as="h1" af="Onderwerpe" en="Topics" />
      <BilingualText af="Kies 'n onderwerp om te begin oefen." en="Choose a topic to start practising." />

      <div className={styles.grid}>
        {topics.map((topic) => {
          const Icon = TOPIC_ICONS[topic.icon] || TOPIC_ICONS.Medal;
          const isCompleted = progress.completedLessons.includes(topic.id);

          return (
            <Card key={topic.id} className={styles.topicCard} onClick={() => navigate(`/onderwerp/${topic.id}`)}>
              <div className={styles.iconCircle} style={{ backgroundColor: topic.colors[5] }}>
                <Icon size={26} aria-hidden="true" />
              </div>
              <div className={styles.topicInfo}>
                <BilingualText as="h3" af={topic.title} en={topic.englishTitle} />
              </div>
              {isCompleted && (
                <CheckCircle2 className={styles.status} size={22} aria-label="Voltooi (Completed)" />
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default TopicsOverview;
