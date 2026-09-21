import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { topics } from "../data/topics";
import { badges } from "../data/badges";
import { totalPossiblePoints } from "../data/lessons";
import Card from "../components/Card";
import BilingualText from "../components/BilingualText";
import TopicBadgeRow from "../components/TopicBadgeRow";
import StreakFlame from "../components/StreakFlame";
import Avatar from "../components/Avatar";
import PhotoPicker from "../components/PhotoPicker";
import Button from "../components/Button";
import { getFullName, getDisplayName } from "../utils/user";
import { TITLES } from "../data/titles";
import styles from "./Profile.module.css";

function Profile() {
  const { user, updateProfile } = useAuth();
  const { progress } = useProgress();
  const isTeacher = user.role === "teacher";

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || null);
  const [saveError, setSaveError] = useState("");

  async function handleSave(event) {
    event.preventDefault();
    setSaveError("");
    try {
      await updateProfile({ firstName, lastName, photoUrl });
      setIsEditing(false);
    } catch {
      setSaveError("Kon nie stoor nie. Probeer weer. (Could not save. Please try again.)");
    }
  }

  const fullName = getFullName(user);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Avatar name={getDisplayName(user)} photoUrl={user.photoUrl} size={64} />
        <div>
          <BilingualText as="h1" af={fullName || user.username} en={user.email} />
        </div>
      </div>

      <Card className={styles.section}>
        {isEditing ? (
          <form className={styles.editForm} onSubmit={handleSave}>
            <BilingualText as="h3" af="Wysig Profiel" en="Edit Profile" />
            <div className={styles.nameRow}>
              {isTeacher ? (
                <div className={styles.field}>
                  <label htmlFor="edit-title">Titel (Title)</label>
                  <select
                    id="edit-title"
                    required
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  >
                    {firstName && !TITLES.some((title) => title.value === firstName) && (
                      <option value={firstName}>{firstName}</option>
                    )}
                    {TITLES.map((title) => (
                      <option key={title.value} value={title.value}>
                        {title.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className={styles.field}>
                  <label htmlFor="edit-firstName">Naam (Name)</label>
                  <input
                    id="edit-firstName"
                    type="text"
                    required
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </div>
              )}
              <div className={styles.field}>
                <label htmlFor="edit-lastName">Van (Surname)</label>
                <input
                  id="edit-lastName"
                  type="text"
                  required
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
            </div>
            <PhotoPicker
              name={[firstName, lastName].filter(Boolean).join(" ") || "?"}
              photoUrl={photoUrl}
              onChange={setPhotoUrl}
            />
            {saveError && <p className={styles.error}>{saveError}</p>}
            <div className={styles.editActions}>
              <Button type="submit">Stoor (Save)</Button>
              <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>
                Kanselleer (Cancel)
              </Button>
            </div>
          </form>
        ) : (
          <Button variant="secondary" onClick={() => setIsEditing(true)}>
            Wysig Profiel (Edit Profile)
          </Button>
        )}
      </Card>

      <div className={styles.statsRow}>
        <Card className={styles.statCard}>
          <span className={styles.statValue}>
            {isTeacher ? `${progress.points}/${totalPossiblePoints()}` : progress.points}
          </span>
          <BilingualText af="Punte" en="Points" />
        </Card>
        <Card className={styles.statCard}>
          <span className={styles.statValue}>
            {isTeacher ? `${progress.badges.length}/${badges.length}` : progress.badges.length}
          </span>
          <BilingualText af="Kentekens Ontsluit" en="Badges Unlocked" />
        </Card>
        {!isTeacher && (
          <Card className={styles.statCard}>
            <StreakFlame count={progress.streak.count} size={48} />
            <BilingualText af="Dae Vlam" en="Day Streak" />
          </Card>
        )}
      </div>

      <Card className={styles.stickerCard}>
        <BilingualText
          as="h3"
          af={`Al My Kentekens (${progress.badges.length}/${badges.length})`}
          en="All My Badges"
        />
        {topics.map((topic) => (
          <TopicBadgeRow key={topic.id} topic={topic} unlockedBadgeIds={progress.badges} />
        ))}
      </Card>
    </div>
  );
}

export default Profile;
