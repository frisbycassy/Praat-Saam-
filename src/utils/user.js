// A user's name is firstName + lastName (for a teacher, firstName holds
// their chosen title, e.g. "Juffrou", so this still reads naturally as
// "Juffrou Hart"). These helpers pick a sensible display string,
// instead of every page repeating the same fallback logic. `username`
// is kept only as a fallback for older accounts created before the
// name-only signup flow.

export function getFullName(user) {
  return [user.firstName, user.lastName].filter(Boolean).join(" ");
}

// Best string to compute avatar initials from, or to greet someone with.
export function getDisplayName(user) {
  return getFullName(user) || user.username || "";
}
