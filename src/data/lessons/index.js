import naamwoorde from "./naamwoorde";
import werkwoorde from "./werkwoorde";
import byvoeglikeNaamwoorde from "./byvoeglike-naamwoorde";
import bywoorde from "./bywoorde";
import voornaamwoorde from "./voornaamwoorde";
import voorsetsels from "./voorsetsels";
import voegwoorde from "./voegwoorde";
import tydsvorme from "./tydsvorme";

// Maps a topic id (from topics.js) to its lesson content.
const lessons = {
  [naamwoorde.topicId]: naamwoorde,
  [werkwoorde.topicId]: werkwoorde,
  [byvoeglikeNaamwoorde.topicId]: byvoeglikeNaamwoorde,
  [bywoorde.topicId]: bywoorde,
  [voornaamwoorde.topicId]: voornaamwoorde,
  [voorsetsels.topicId]: voorsetsels,
  [voegwoorde.topicId]: voegwoorde,
  [tydsvorme.topicId]: tydsvorme,
};

export function findLesson(topicId) {
  return lessons[topicId] || null;
}
