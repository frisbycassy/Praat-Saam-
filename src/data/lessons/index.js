import term1Inligtingstekste from "./term1-inligtingstekste";

// Maps a theme id (from curriculum.js) to its lesson content. As more
// lessons are written, import them and add a line here.
const lessons = {
  [term1Inligtingstekste.themeId]: term1Inligtingstekste,
};

export function findLesson(themeId) {
  return lessons[themeId] || null;
}
