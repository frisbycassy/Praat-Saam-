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
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  function signup(name, email, role = "learner") {
    setUser({ name, email, role });
  }

  function login(email) {
    setUser((current) => current || { name: email.split("@")[0], email, role: "learner" });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
