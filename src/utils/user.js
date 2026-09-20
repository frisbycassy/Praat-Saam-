// A user's real name (firstName + lastName), a casual nickname (e.g. how
// a teacher likes to be addressed, like "Miss. Frisby"), and their
// username (the account handle) are three separate, optional pieces of
// identity. These helpers pick a sensible one to show depending on
// context, instead of every page repeating the same fallback logic.

export function getFullName(user) {
  return [user.firstName, user.lastName].filter(Boolean).join(" ");
}

// Best string to compute avatar initials from, or to greet someone with.
export function getDisplayName(user) {
  return getFullName(user) || user.nickname || user.username || "";
}
