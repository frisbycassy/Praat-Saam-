import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import Card from "../components/Card";
import Avatar from "../components/Avatar";
import BilingualText from "../components/BilingualText";
import { getFullName, getDisplayName } from "../utils/user";
import styles from "./Teacher.module.css";

function Teacher() {
  const { user } = useAuth();
  const [teachers, setTeachers] = useState([]);
  const [learnerCount, setLearnerCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role === "teacher") return;

    let active = true;
    async function load() {
      const [{ data: profiles, error: profilesError }, { data: count, error: countError }] =
        await Promise.all([
          supabase.from("profiles").select("*").eq("role", "teacher").order("first_name"),
          supabase.rpc("get_learner_count"),
        ]);
      if (!active) return;
      if (profilesError || countError) {
        setError("Kon nie onderwyser-inligting laai nie. (Could not load teacher info.)");
        setLoading(false);
        return;
      }

      setTeachers(
        (profiles || []).map((p) => ({
          id: p.id,
          firstName: p.first_name || "",
          lastName: p.last_name || "",
          nickname: p.nickname || "",
          username: p.username || "",
          email: p.email,
          photoUrl: p.photo_url || null,
        })),
      );
      setLearnerCount(count ?? 0);
      setLoading(false);
    }
    load();

    return () => {
      active = false;
    };
  }, [user]);

  if (user?.role === "teacher") return <Navigate to="/tuisblad" replace />;

  return (
    <div className={styles.page}>
      <BilingualText as="h1" af="My Onderwyser" en="My Teacher" />
      <BilingualText
        af="Alles wat jy oor jou onderwyser moet weet."
        en="Everything you need to know about your teacher."
      />

      {loading && <p className={styles.note}>Laai... (Loading...)</p>}
      {error && <p className={styles.note}>{error}</p>}
      {!loading && !error && teachers.length === 0 && (
        <p className={styles.note}>Geen onderwyser gevind nie. (No teacher found.)</p>
      )}

      {!loading &&
        !error &&
        teachers.map((teacher) => (
          <Card key={teacher.id} className={styles.teacherCard}>
            <Avatar name={getDisplayName(teacher)} photoUrl={teacher.photoUrl} size={72} />
            <div className={styles.info}>
              <BilingualText as="h2" af={teacher.nickname || getFullName(teacher)} en={teacher.email} />
              {teacher.nickname && getFullName(teacher) && (
                <p className={styles.fullName}>{getFullName(teacher)}</p>
              )}
              {teacher.username && <p className={styles.username}>@{teacher.username}</p>}
            </div>
          </Card>
        ))}

      {!loading && !error && learnerCount !== null && (
        <Card className={styles.statCard}>
          <span className={styles.statValue}>{learnerCount}</span>
          <BilingualText af="Leerders in die Klas" en="Learners in the Class" />
        </Card>
      )}
    </div>
  );
}

export default Teacher;
