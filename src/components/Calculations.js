export const MotivationPerSecond = (stats) => {
  const motivationPerSecond = ((
  (1 + calculateMotivationBoost(stats,'motivationPoster')) * stats.motivationPoster
  + (10+ calculateMotivationBoost(stats,'selfHelpBook')) * stats.selfHelpBook  
  + (20+ calculateMotivationBoost(stats,'meditationGuide')) * stats.meditationGuide 
  + (25+ calculateMotivationBoost(stats,'yogaMat')) * stats.yogaMat 
  + (30+ calculateMotivationBoost(stats,'energyDrink')) * stats.energyDrink
  + (50+ calculateMotivationBoost(stats,'influencerCourse')) * stats.influencerCourse) 
  * stats.achievementMultiplier
  - (stats.explore + stats.draw + stats.books + stats.talking) - 10 * stats.pencil - 100 * stats.motivationPoints);
  return motivationPerSecond;
};
export const InspirationPerSecond = (stats) => {
  const inspirationPerSecond = ((5 * stats.explore) * stats.achievementMultiplier)- 3 * stats.pencil;
  return inspirationPerSecond;
};
export const CreativityPerSecond = (stats) => {
  const creativityPerSecond = ((5 * stats.draw) * stats.achievementMultiplier) - 5 * stats.pencil;
  return creativityPerSecond;
};
export const KnowledgePerSecond = (stats) => {
  const knowledgePerSecond = ((5 * stats.books) * stats.achievementMultiplier);
  return knowledgePerSecond;
};
export const SocialPerSecond = (stats) => {
  const socialPerSecond = ((5 * stats.talking) * stats.achievementMultiplier - 100 * stats.socialPoints);
  return socialPerSecond;
};
export const WritingPerSecond = ( stats) =>{
 const writingPerSecond = ((1 * stats.pencil) * stats.achievementMultiplier) - 100 * stats.writingPoints;
  return writingPerSecond;
}
export const MoneyPerSecond = (stats) =>{
const moneyPerSecond = ((10* (stats.motivationPoints * 0.01 + stats.writingPoints * 0.05) * 100.0) *stats.achievementMultiplier)
return moneyPerSecond;
}
export const calculateMotivationBoost = (stats, type) => {
  let boost = 0;
  stats.upgrades
    .filter(upgrade => upgrade.type === 'motivation' && upgrade.area === type && upgrade.purchased)
    .forEach(upgrade => {
      boost += upgrade.effect;
    });
  return boost;
};