import naamwoorde from "./naamwoorde";
import werkwoorde from "./werkwoorde";
import byvoeglikeNaamwoorde from "./byvoeglike-naamwoorde";
import bywoorde from "./bywoorde";
import voornaamwoorde from "./voornaamwoorde";
import voorsetsels from "./voorsetsels";
import voegwoorde from "./voegwoorde";
import tydsvorme from "./tydsvorme";

// Maps a topic id to its array of up to 5 lessons (index 0-4). A slot
// can be `null` when that lesson hasn't been written yet.
const lessonsByTopic = {
  naamwoorde,
  werkwoorde,
  "byvoeglike-naamwoorde": byvoeglikeNaamwoorde,
  bywoorde,
  voornaamwoorde,
  voorsetsels,
  voegwoorde,
  tydsvorme,
};

export function findLesson(topicId, lessonIndex) {
  const lessons = lessonsByTopic[topicId];
  if (!lessons) return null;
  return lessons[lessonIndex] || null;
}

export function lessonCountForTopic(topicId) {
  const lessons = lessonsByTopic[topicId] || [];
  return lessons.filter(Boolean).length;
}
