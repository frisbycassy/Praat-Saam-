import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { badges } from "../data/badges";
import Card from "../components/Card";
import Avatar from "../components/Avatar";
import BilingualText from "../components/BilingualText";
import { getFullName, getDisplayName } from "../utils/user";
import styles from "./Learners.module.css";

function Learners() {
  const { user } = useAuth();
  const [learners, setLearners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role !== "teacher") return;

    let active = true;
    async function load() {
      const [{ data: profiles, error: profilesError }, { data: progressRows, error: progressError }] =
        await Promise.all([
          supabase.from("profiles").select("*").eq("role", "learner").order("first_name"),
          supabase.from("progress").select("*"),
        ]);
      if (!active) return;
      if (profilesError || progressError) {
        setError("Kon nie leerders laai nie. (Could not load learners.)");
        setLoading(false);
        return;
      }

      const progressByUserId = Object.fromEntries((progressRows || []).map((row) => [row.user_id, row]));
      const merged = (profiles || []).map((profile) => {
        const progress = progressByUserId[profile.id];
        return {
          id: profile.id,
          firstName: profile.first_name || "",
          lastName: profile.last_name || "",
          nickname: profile.nickname || "",
          username: profile.username || "",
          email: profile.email,
          photoUrl: profile.photo_url || null,
          points: progress?.points ?? 0,
          badgeCount: (progress?.badges || []).length,
        };
      });
      setLearners(merged);
      setLoading(false);
    }
    load();

    return () => {
      active = false;
    };
  }, [user]);

  if (user?.role !== "teacher") return <Navigate to="/tuisblad" replace />;

  return (
    <div className={styles.page}>
      <BilingualText as="h1" af="Leerders" en="Learners" />
      <BilingualText
        af="Alle leerders wat toegang tot Praat Saam! het."
        en="All learners who have access to Praat Saam!"
      />

      {loading && <p className={styles.note}>Laai... (Loading...)</p>}
      {error && <p className={styles.note}>{error}</p>}
      {!loading && !error && learners.length === 0 && (
        <p className={styles.note}>
          Nog geen leerders het geregistreer nie. (No learners have signed up yet.)
        </p>
      )}

      <div className={styles.grid}>
        {learners.map((learner) => (
          <Card key={learner.id} className={styles.learnerCard}>
            <Avatar name={getDisplayName(learner)} photoUrl={learner.photoUrl} size={56} />
            <div className={styles.info}>
              <BilingualText as="h3" af={learner.username || getFullName(learner)} en={learner.email} />
              {getFullName(learner) && <p className={styles.fullName}>{getFullName(learner)}</p>}
              {learner.nickname && <p className={styles.nickname}>&ldquo;{learner.nickname}&rdquo;</p>}
              <div className={styles.stats}>
                <span>{learner.points} punte (points)</span>
                <span>
                  {learner.badgeCount}/{badges.length} kentekens (badges)
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Learners;
