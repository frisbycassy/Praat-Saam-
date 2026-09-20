import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { getLevelForPoints } from "../data/levels";
import { topics } from "../data/topics";
import { lessonBadges } from "../data/lessonBadges";
import Card from "../components/Card";
import BilingualText from "../components/BilingualText";
import StickerCategoryRow from "../components/StickerCategoryRow";
import LessonBadgeIcon from "../components/LessonBadgeIcon";
import StreakFlame from "../components/StreakFlame";
import Avatar from "../components/Avatar";
import PhotoPicker from "../components/PhotoPicker";
import Button from "../components/Button";
import { getFullName, getDisplayName } from "../utils/user";
import styles from "./Profile.module.css";

function Profile() {
  const { user, updateProfile } = useAuth();
  const { progress } = useProgress();
  const level = getLevelForPoints(progress.points);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [nickname, setNickname] = useState(user.nickname || "");
  const [username, setUsername] = useState(user.username || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || null);

  function handleSave(event) {
    event.preventDefault();
    updateProfile({ firstName, lastName, nickname, username, photoUrl });
    setIsEditing(false);
  }

  const fullName = getFullName(user);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Avatar name={getDisplayName(user)} photoUrl={user.photoUrl} size={64} />
        <div>
          <BilingualText as="h1" af={user.username || fullName} en={user.email} />
          {fullName && <p className={styles.username}>{fullName}</p>}
          {user.nickname && <p className={styles.nickname}>&ldquo;{user.nickname}&rdquo;</p>}
        </div>
      </div>

      <Card className={styles.section}>
        {isEditing ? (
          <form className={styles.editForm} onSubmit={handleSave}>
            <BilingualText as="h3" af="Wysig Profiel" en="Edit Profile" />
            <div className={styles.nameRow}>
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
            <div className={styles.field}>
              <label htmlFor="edit-nickname">Bynaam (Nickname) - opsioneel (optional)</label>
              <input
                id="edit-nickname"
                type="text"
                placeholder="bv. Miss. Frisby"
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="edit-username">Gebruikersnaam (Username)</label>
              <input
                id="edit-username"
                type="text"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <PhotoPicker
              name={[firstName, lastName].filter(Boolean).join(" ") || nickname}
              photoUrl={photoUrl}
              onChange={setPhotoUrl}
            />
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
          <span className={styles.statValue}>{progress.points}</span>
          <BilingualText af="Punte" en="Points" />
        </Card>
        <Card className={styles.statCard}>
          <span className={styles.statValue}>{level.level}</span>
          <BilingualText af={level.title} en={level.englishTitle} />
        </Card>
        <Card className={styles.statCard}>
          <StreakFlame count={progress.streak.count} size={48} />
          <BilingualText af="Dae Vlam" en="Day Streak" />
        </Card>
      </div>

      <Card className={styles.stickerCard}>
        <BilingualText as="h3" af="Al My Plakkers" en="All My Stickers" />
        {topics.map((topic) => (
          <StickerCategoryRow key={topic.id} topic={topic} unlockedStickerIds={progress.stickers} />
        ))}
      </Card>

      <Card className={styles.stickerCard}>
        <BilingualText
          as="h3"
          af={`Les-kentekens (${progress.lessonBadges.length}/${lessonBadges.length})`}
          en="Lesson Badges"
        />
        <div className={styles.badgeGrid}>
          {lessonBadges.map((badge) => (
            <LessonBadgeIcon key={badge.id} badge={badge} unlocked={progress.lessonBadges.includes(badge.id)} />
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Profile;
