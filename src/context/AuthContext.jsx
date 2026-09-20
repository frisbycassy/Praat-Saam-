import { createContext, useContext, useEffect, useState } from "react";

// TEMPORARY: this stores the "logged in" user in the browser's local
// storage instead of a real account system. It lets us build and test
// every page of the site right now. Once we connect Supabase, only the
// inside of these three functions needs to change - every page that uses
// useAuth() can stay exactly the same.
const STORAGE_KEY = "praatsaam-user";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!user) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch {
      // A profile picture can be too large for local storage's ~5MB
      // limit. Keep the account working in this session, just without
      // the picture surviving a page refresh.
      console.warn("Could not save profile picture to local storage (too large).");
    }
  }, [user]);

  function signup({ firstName, lastName, nickname, email, role = "learner", username, photoUrl }) {
    setUser({ firstName, lastName, nickname, email, role, username, photoUrl: photoUrl || null });
  }

  function login(email) {
    setUser(
      (current) =>
        current || {
          firstName: email.split("@")[0],
          lastName: "",
          nickname: "",
          email,
          role: "learner",
          username: email.split("@")[0],
          photoUrl: null,
        },
    );
  }

  function logout() {
    setUser(null);
  }

  function updateProfile(updates) {
    setUser((current) => (current ? { ...current, ...updates } : current));
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
