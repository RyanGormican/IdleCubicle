import React, { useState, useEffect } from 'react';

const Achievements = ({ stats, setStats }) => {
  const [achievementMultiplier, setAchievementMultiplier] = useState(stats.achievementMultiplier);
  const [achievedMotivationPosters, setAchievedMotivationPosters] = useState([]);
  const [achievedSelfHelpBooks, setAchievedSelfHelpBooks] = useState([]);
  const [motivationalPostersOpen, setMotivationalPostersOpen] = useState(false);
  const [selfHelpBooksOpen, setSelfHelpBooksOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      checkAchievements();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const checkAchievements = () => {
    const totalMotivationalPosterAchievements = 50;
    const totalSelfHelpBookAchievements = 50;

    const motivationPosterAchievementLevels = Array.from({ length: 50 }, (_, index) => (index + 1) * 10);
    const selfHelpBookAchievementLevels = Array.from({ length: 50 }, (_, index) => (index + 1) * 10);

    const newAchievedMotivationPosters = motivationPosterAchievementLevels.filter(level => stats.motivationPoster >= level);
    const newAchievedSelfHelpBooks = selfHelpBookAchievementLevels.filter(level => stats.selfHelpBook >= level);

    setAchievedMotivationPosters(newAchievedMotivationPosters);
    setAchievedSelfHelpBooks(newAchievedSelfHelpBooks);

    const totalMotivationalPostersEarned = newAchievedMotivationPosters.length;
    const totalSelfHelpBooksEarned = newAchievedSelfHelpBooks.length;

    const totalAchievementsEarned = totalMotivationalPostersEarned + totalSelfHelpBooksEarned;

    const expectedMultiplier = Math.min(1 + (totalAchievementsEarned * 0.01), 2);
    if (achievementMultiplier !== expectedMultiplier) {
      setAchievementMultiplier(expectedMultiplier);
      setStats(prevStats => ({
        ...prevStats,
        achievementMultiplier: expectedMultiplier,
      }));
    }
  };

return (
  <div className="resources">
    <div>
      <p>Total Achievements Earned: {achievedMotivationPosters.length + achievedSelfHelpBooks.length} / 100 (  {((achievedMotivationPosters.length + achievedSelfHelpBooks.length) / 100 * 100).toFixed(2)}% ) </p>
      <p>Achievement Multiplier: {stats.achievementMultiplier}</p>
    </div>
    <div>
      <button
        className="btn btn-primary"
        onClick={() => setMotivationalPostersOpen(!motivationalPostersOpen)}
      >
       Motivational Posters ({achievedMotivationPosters.length} / 50)
      </button>
      {motivationalPostersOpen && (
        <div>
          {Array.from({ length: 50 }, (_, index) => (index + 1) * 10).map(level => (
            <div
              key={level}
              className={`achievement-square ${
                achievedMotivationPosters.includes(level) ? 'achieved' : ''
              }`}
              style={{ color: achievedMotivationPosters.includes(level) ? 'green' : 'inherit' }}
            >
              Motivational Poster {level}
            </div>
          ))}
        </div>
      )}
    </div>
    <div>
      <button
        className="btn btn-primary"
        onClick={() => setSelfHelpBooksOpen(!selfHelpBooksOpen)}
      >
        Self-Help Books ({achievedSelfHelpBooks.length} / 50)
      </button>
      {selfHelpBooksOpen && (
        <div>
          {Array.from({ length: 50 }, (_, index) => (index + 1) * 10).map(level => (
            <div
              key={level}
              className={`achievement-square ${
                achievedSelfHelpBooks.includes(level) ? 'achieved' : ''
              }`}
              style={{ color: achievedSelfHelpBooks.includes(level) ? 'green' : 'inherit' }}
            >
              Self-Help Book {level}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

};

export default Achievements;
