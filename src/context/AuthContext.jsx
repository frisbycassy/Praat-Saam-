import { createContext, useContext, useEffect, useState } from "react";

// TEMPORARY: accounts and the current session both live in the browser's
// local storage instead of a real account system. It lets us build and
// test every page of the site right now. Once we connect Supabase, only
// the inside of these functions needs to change - every page that uses
// useAuth() can stay exactly the same.
//
// ACCOUNTS_KEY holds every profile ever signed up, keyed by email, so
// logging back in (even after logging out) restores the same name,
// username, nickname and profile picture instead of starting blank.
const SESSION_KEY = "praatsaam-user";
const ACCOUNTS_KEY = "praatsaam-accounts";

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function readAccounts() {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || {};
  } catch {
    return {};
  }
}

function saveAccount(profile) {
  try {
    const accounts = readAccounts();
    accounts[normalizeEmail(profile.email)] = profile;
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {
    // A profile picture can be too large for local storage's ~5MB
    // limit. Keep the account working in this session, just without
    // the picture surviving a page refresh.
    console.warn("Could not save account details to local storage (too large).");
  }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!user) {
      localStorage.removeItem(SESSION_KEY);
      return;
    }
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } catch {
      console.warn("Could not save the current session to local storage (too large).");
    }
  }, [user]);

  function signup({ firstName, lastName, nickname, email, role = "learner", username, photoUrl }) {
    const profile = { firstName, lastName, nickname, email, role, username, photoUrl: photoUrl || null };
    saveAccount(profile);
    setUser(profile);
  }

  // Restores the saved profile for this email if one exists (name,
  // username, nickname, photo and all), instead of starting fresh every
  // time someone logs back in.
  function login(email) {
    const accounts = readAccounts();
    const saved = accounts[normalizeEmail(email)];
    if (saved) {
      setUser(saved);
      return;
    }

    const fallback = {
      firstName: email.split("@")[0],
      lastName: "",
      nickname: "",
      email,
      role: "learner",
      username: email.split("@")[0],
      photoUrl: null,
    };
    saveAccount(fallback);
    setUser(fallback);
  }

  function logout() {
    setUser(null);
  }

  function updateProfile(updates) {
    setUser((current) => {
      if (!current) return current;
      const next = { ...current, ...updates };
      saveAccount(next);
      return next;
    });
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
