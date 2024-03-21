import React from 'react';

const Energize = ({ stats, setStats }) => {
  const buyMotivationPoster = () => {
    const currentPrice = calculateMotivationPosterPrice();
    if (stats.motivation >= currentPrice) {
      setStats(prevStats => ({
        ...prevStats,
        motivation: prevStats.motivation - currentPrice,
        motivationPoster:  prevStats.motivationPoster +1,
      }));
    } else {
      alert("Not enough motivation to buy!");
    }
  };
    const hypeUp = () => {
     setStats(prevStats => ({
        ...prevStats,
        motivation: prevStats.motivation + 1,
      }));
    }
  const calculateMotivationPosterPrice = () => {
  if( stats.motivationPoster >0)
  {
    const initialPrice = 30;
    const increaseRate = 1.07;
    const price = initialPrice * Math.pow(increaseRate, stats.motivationPoster);
    return Math.round(price);
    }
    else
    {
        return 30;
    }
  };

  return (
    <div className="resources">
      <p>Motivation: {stats.motivation}       <button onClick={hypeUp}>Hype up</button> </p>
      <div>
      <p>Motivation Poster(+{stats.motivationPoster * 1 * stats.achievementMultiplier}/sec): {stats.motivationPoster} --- {calculateMotivationPosterPrice()}
      <button onClick={buyMotivationPoster}>Buy Motivation Poster</button> </p>
  </div>
    </div>
  );
};

export default Energize;
