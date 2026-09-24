import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CalendarCheck,
  Check,
  GraduationCap,
  Heart,
  Home,
  LayoutGrid,
  LogOut,
  User,
  Users,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { isSchoolDay } from "../utils/schoolDay";
import { getDisplayName } from "../utils/user";
import Avatar from "./Avatar";
import StreakFlame from "./StreakFlame";
import Logo from "./Logo";
import HolidayBanner from "./HolidayBanner";
import styles from "./Navbar.module.css";

function Navbar() {
  const { user, logout } = useAuth();
  const { progress, isReady } = useProgress();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // The tab for the page that's open is highlighted in orange. Topic and
  // lesson pages (/onderwerp/...) count as part of Onderwerpe.
  function pillClass(...paths) {
    const isActive = paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
    return isActive ? `${styles.pill} ${styles.active}` : styles.pill;
  }

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  const isTeacher = user?.role === "teacher";

  return (
    <header className={styles.bar}>
      <Link to={user ? "/tuisblad" : "/"} className={styles.logo}>
        <Logo size={32} />
        <span>
          <span className={styles.brandPurple}>Praat</span>{" "}
          <span className={styles.brandOrange}>Saam!</span>
        </span>
      </Link>

      {user && <HolidayBanner />}

      {!user && (
        <div className={styles.right}>
          <Link to="/skenk" className={pillClass("/skenk")}>
            <Heart size={16} aria-hidden="true" />
            <span className="label">Skenk (Donate)</span>
          </Link>
        </div>
      )}

      {user && (
        <div className={styles.right}>
          <Link to="/tuisblad" className={pillClass("/tuisblad")}>
            <Home size={16} aria-hidden="true" />
            <span className="label">Huis (Home)</span>
          </Link>
          {!isTeacher && (
            <Link to="/verskuldig" className={pillClass("/verskuldig")}>
              <CalendarCheck size={16} aria-hidden="true" />
              <span className="label">Take (Tasks)</span>
              {isReady && progress.due.owed === 0 && (
                <span className={styles.dueDone} aria-label="Alles klaar (All done)">
                  <Check size={12} strokeWidth={3.5} aria-hidden="true" />
                </span>
              )}
              {isReady && progress.due.owed > 0 && isSchoolDay() && (
                <span className={styles.dueCount}>{progress.due.owed}</span>
              )}
            </Link>
          )}
          <Link to="/onderwerpe" className={pillClass("/onderwerpe", "/onderwerp")}>
            <LayoutGrid size={16} aria-hidden="true" />
            <span className="label">Onderwerpe (Topics)</span>
          </Link>
          {isTeacher ? (
            <>
              <Link to="/leerders" className={pillClass("/leerders")}>
                <Users size={16} aria-hidden="true" />
                <span className="label">Leerders (Learners)</span>
              </Link>
              <span className={styles.roleLabel}>
                <GraduationCap size={16} aria-hidden="true" />
                <span className="label">Onderwyser (Teacher)</span>
              </span>
            </>
          ) : (
            <>
              <Link to="/onderwyser" className={pillClass("/onderwyser")}>
                <GraduationCap size={16} aria-hidden="true" />
                <span className="label">My Onderwyser (My Teacher)</span>
              </Link>
              <span className={styles.roleLabel}>
                <User size={16} aria-hidden="true" />
                <span className="label">Leerder (Learner)</span>
              </span>
              <StreakFlame count={progress.streak.count} size={30} />
            </>
          )}
          {isTeacher && (
            <Link to="/skenk" className={pillClass("/skenk")}>
              <Heart size={16} aria-hidden="true" />
              <span className="label">Skenk (Donate)</span>
            </Link>
          )}
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
