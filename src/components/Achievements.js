import React, { useState, useEffect } from 'react';

const Achievements = ({ stats, setStats }) => {
  const [achievementMultiplier, setAchievementMultiplier] = useState(stats.achievementMultiplier);
  const [achievedPosters, setAchievedPosters] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      checkAchievements();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const checkAchievements = () => {
    const achievementLevels = Array.from({ length: 10 }, (_, index) => (index + 1) * 10);
    const newAchievedPosters = achievementLevels.filter(level => stats.motivationPoster >= level);

    setAchievedPosters(newAchievedPosters);

    const expectedMultiplier = Math.min(1 + (newAchievedPosters.length * 0.01), 2);
    if (achievementMultiplier !== expectedMultiplier) {
      setAchievementMultiplier(expectedMultiplier);
      setStats(prevStats => ({
        ...prevStats,
        achievementMultiplier: expectedMultiplier,
      }));
    }
  };

  const totalAchievements = 10;
  const percentageAchieved = (achievedPosters.length / totalAchievements) * 100;

  return (
    <div className="achievements">
      <div> 
      Achievement Multiplier: {stats.achievementMultiplier}
      </div>
      <div className="achievement-tracker">
        Achievements Earned: {percentageAchieved.toFixed(2)}%
      </div>
      <div className="grid">
        {Array.from({ length: 10 }, (_, index) => (index + 1) * 10).map(level => (
          <div
            key={level}
            className={`achievement-square ${stats.motivationPoster >= level ? 'achieved' : ''}`}
            style={{ color: stats.motivationPoster >= level ? 'green' : 'inherit' }}
          >
            Motivational Poster {level}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
