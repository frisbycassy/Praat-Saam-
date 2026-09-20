// Every badge a learner can earn. `icon` names a lucide-react icon used by
// the BadgeIcon component.
export const badges = [
  {
    id: "eerste-les",
    title: "Eerste Les",
    englishTitle: "First Lesson",
    description: "Voltooi jou eerste les.",
    englishDescription: "Complete your first lesson.",
    icon: "Star",
  },
  {
    id: "volpunte",
    title: "Volpunte",
    englishTitle: "Perfect Score",
    description: "Kry al die vrae in 'n les reg.",
    englishDescription: "Get every question right in a lesson.",
    icon: "Trophy",
  },
  {
    id: "vlam-3",
    title: "3-Dae Vlam",
    englishTitle: "3-Day Streak",
    description: "Gebruik die webwerf 3 dae agter mekaar.",
    englishDescription: "Use the site 3 days in a row.",
    icon: "Flame",
  },
];

export function findBadge(badgeId) {
  return badges.find((badge) => badge.id === badgeId) || null;
}
