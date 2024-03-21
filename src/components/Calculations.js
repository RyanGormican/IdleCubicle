export const MotivationPerSecond = (stats) => {
  const motivationPerSecond = ((1 * stats.motivationPoster + 10 * stats.selfHelpBook) * stats.achievementMultiplier - (stats.explore + stats.draw + stats.books + stats.talking));
  return motivationPerSecond.toFixed(2);
};
export const InspirationPerSecond = (stats) => {
  const inspirationPerSecond = ((1 * stats.explore) * stats.achievementMultiplier);
  return inspirationPerSecond.toFixed(2);
};
export const CreativityPerSecond = (stats) => {
  const creativityPerSecond = ((1 * stats.draw) * stats.achievementMultiplier);
  return creativityPerSecond.toFixed(2);
};
export const KnowledgePerSecond = (stats) => {
  const knowledgePerSecond = ((1 * stats.books) * stats.achievementMultiplier);
  return knowledgePerSecond.toFixed(2);
};
export const SocialPerSecond = (stats) => {
  const socialPerSecond = ((1 * stats.talking) * stats.achievementMultiplier);
  return socialPerSecond.toFixed(2);
};