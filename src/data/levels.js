// Level titles unlocked by total points. Keep this list sorted by
// minPoints ascending.
export const levels = [
  { level: 1, title: "Nuweling", englishTitle: "Newbie", minPoints: 0 },
  { level: 2, title: "Ontdekker", englishTitle: "Explorer", minPoints: 50 },
  { level: 3, title: "Avonturier", englishTitle: "Adventurer", minPoints: 120 },
  { level: 4, title: "Kampioen", englishTitle: "Champion", minPoints: 220 },
  { level: 5, title: "Meester", englishTitle: "Master", minPoints: 350 },
];

export function getLevelForPoints(points) {
  let current = levels[0];
  for (const level of levels) {
    if (points >= level.minPoints) current = level;
  }
  return current;
}

export function getNextLevel(points) {
  const current = getLevelForPoints(points);
  return levels.find((level) => level.minPoints > current.minPoints) || null;
}
