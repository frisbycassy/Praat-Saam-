import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, LogOut, Settings, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { getLevelForPoints } from "../data/levels";
import { getDisplayName } from "../utils/user";
import Avatar from "./Avatar";
import StreakFlame from "./StreakFlame";
import styles from "./Navbar.module.css";

function Navbar() {
  const { user, logout } = useAuth();
  const { progress } = useProgress();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  const level = getLevelForPoints(progress.points);
  const isTeacher = user?.role === "teacher";

  return (
    <header className={styles.bar}>
      <Link to={user ? "/tuisblad" : "/"} className={styles.logo}>
        Praat Saam!
      </Link>

      {user && (
        <div className={styles.right}>
          {isTeacher ? (
            <span className={styles.pill}>
              <GraduationCap size={16} aria-hidden="true" />
              <span className="label">Onderwyser (Teacher)</span>
            </span>
          ) : (
            <>
              <Link to="/profiel" className={styles.pill}>
                <Sparkles size={16} aria-hidden="true" />
                <span className="label">
                  Vlak {level.level} - {level.title}
                </span>
              </Link>
              <StreakFlame count={progress.streak.count} size={30} />
            </>
          )}
          <Link
            to="/instellings"
            className={styles.iconButton}
            aria-label="Instellings (Settings)"
          >
            <Settings size={20} />
          </Link>
          <Link to="/profiel" aria-label="Profiel (Profile)">
            <Avatar name={getDisplayName(user)} photoUrl={user.photoUrl} />
          </Link>
          <button
            type="button"
            className={styles.iconButton}
            onClick={handleLogout}
            aria-label="Meld af (Log out)"
          >
            <LogOut size={20} />
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
