// Prints SQL that refreshes the database's answer key (public.lesson_answers)
// from the lesson files. The database marks quizzes against this key, so run
// this and apply its output whenever lesson questions are added or changed:
//   node scripts/lesson-answers-sql.mjs > answers.sql
import { readdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const lessonsDir = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "lessons");
// File name -> topic id, matching src/data/lessons/index.js.
const TOPIC_IDS = {
  "naamwoorde.js": "naamwoorde",
  "werkwoorde.js": "werkwoorde",
  "byvoeglike-naamwoorde.js": "byvoeglike-naamwoorde",
  "bywoorde.js": "bywoorde",
  "voornaamwoorde.js": "voornaamwoorde",
  "voorsetsels.js": "voorsetsels",
  "voegwoorde.js": "voegwoorde",
  "tydsvorme.js": "tydsvorme",
};

const rows = [];
for (const file of readdirSync(lessonsDir)) {
  const topicId = TOPIC_IDS[file];
  if (!topicId) continue;
  const { default: lessons } = await import(pathToFileURL(join(lessonsDir, file)).href);
  lessons.forEach((lesson, lessonIndex) => {
    if (!lesson) return;
    lesson.questions.forEach((question, questionIndex) => {
      rows.push(`('${topicId}', ${lessonIndex}, ${questionIndex}, ${question.correctIndex})`);
    });
  });
}

console.log("begin;");
console.log("delete from public.lesson_answers;");
console.log("insert into public.lesson_answers (topic_id, lesson_index, question_index, correct_index) values");
console.log(rows.join(",\n") + ";");
console.log("commit;");
