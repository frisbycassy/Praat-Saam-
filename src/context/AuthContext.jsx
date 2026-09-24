import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

// Accounts and progress now live in Supabase, so the same login works from
// any device/browser - not just the one you signed up on.
const AuthContext = createContext(null);

// Supabase itself refuses passwords under 6 characters, but we allow 4 so
// young learners can pick something easy to type. Short passwords get a fixed
// tail added (on sign-up and log-in alike) to reach Supabase's minimum.
const SUPABASE_MIN_PASSWORD = 6;
const PASSWORD_PAD = "Praat!";
function padPassword(password) {
  return password.length >= SUPABASE_MIN_PASSWORD
    ? password
    : password + PASSWORD_PAD.slice(0, SUPABASE_MIN_PASSWORD - password.length);
}

function toAppProfile(row) {
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    firstName: row.first_name || "",
    lastName: row.last_name || "",
    nickname: row.nickname || "",
    username: row.username || "",
    role: row.role || "learner",
    photoUrl: row.photo_url || null,
    createdAt: row.created_at || null,
  };
}

function toDbProfile(userId, email, updates) {
  const db = { id: userId, email };
  if (updates.firstName !== undefined) db.first_name = updates.firstName;
  if (updates.lastName !== undefined) db.last_name = updates.lastName;
  if (updates.nickname !== undefined) db.nickname = updates.nickname;
  if (updates.username !== undefined) db.username = updates.username;
  if (updates.role !== undefined) db.role = updates.role;
  if (updates.photoUrl !== undefined) db.photo_url = updates.photoUrl;
  return db;
}

async function fetchProfile(userId) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
  if (error) throw error;
  return toAppProfile(data);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!active) return;
      if (session?.user) {
        try {
          setUser(await fetchProfile(session.user.id));
        } catch {
          setUser(null);
        }
      }
      setLoading(false);
    }
    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!active) return;
      if (!session?.user) {
        setUser(null);
        return;
      }
      try {
        setUser(await fetchProfile(session.user.id));
      } catch {
        setUser(null);
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  async function signup({ firstName, lastName, nickname, email, role = "learner", username, photoUrl, password }) {
    const { data, error } = await supabase.auth.signUp({ email, password: padPassword(password) });
    if (error) throw error;

    const userId = data.user.id;
    const profileRow = toDbProfile(userId, email, { firstName, lastName, nickname, username, role, photoUrl });
    const { error: profileError } = await supabase.from("profiles").upsert(profileRow);
    if (profileError) throw profileError;
    // The database creates the learner's progress row itself.

    setUser(toAppProfile(profileRow));
  }

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: padPassword(password),
    });
    if (error) throw error;
    setUser(await fetchProfile(data.user.id));
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  async function updateProfile(updates) {
    if (!user) return;
    const profileRow = toDbProfile(user.id, user.email, updates);
    const { error } = await supabase.from("profiles").update(profileRow).eq("id", user.id);
    if (error) throw error;
    setUser((current) => ({ ...current, ...updates }));
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
