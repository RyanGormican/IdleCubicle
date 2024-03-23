import React, {useState} from 'react';
import { MotivationPerSecond} from './Calculations';
const Energize = ({ stats, setStats }) => {
const [view,setView] = useState('Items');

const buyUpgrade = (upgrade) => {
  const currentPrice = upgrade.price;
  if (stats.motivation >= currentPrice && !upgrade.purchased) {
    setStats(prevStats => ({
      ...prevStats,
      motivation: prevStats.motivation - currentPrice,
      upgrades: prevStats.upgrades.map(item => {
        if (item.name === upgrade.name) {
          return { ...item, purchased: true };
        }
        return item;
      })
    }));
  } else {
    alert("Not enough motivation!");
  }
};

  const buyItem = (itemType) => {
    const currentPrice = calculatePrice(itemType);
    if (stats.motivation >= currentPrice) {
      setStats(prevStats => ({
        ...prevStats,
        motivation: prevStats.motivation - currentPrice,
        [itemType]: prevStats[itemType] + 1,
      }));
    } else {
      alert("Not enough motivation to buy!");
    }
  };

  const hypeUp = () => {
    setStats(prevStats => ({
      ...prevStats,
      motivation: prevStats.motivation + ( ( 1 + 1* stats.foamfinger) * stats.achievementMultiplier ) ,
    }));
  };

  const calculatePrice = (itemType) => {
    let basePrice, increaseRate;
    switch(itemType) {
      case 'foamfinger':
      basePrice=50;
      increaseRate = 1.01;
      break;
      case 'motivationPoster':
        basePrice = 30;
        increaseRate = 1.07;
        break;
      case 'selfHelpBook':
        basePrice = 500;
        increaseRate = 1.06;
        break;
      case 'meditationGuide':
        basePrice = 1000;
        increaseRate = 1.05;
        break;
      case 'yogaMat':
        basePrice = 1500;
        increaseRate = 1.05;
        break;
      case 'energyDrink':
        basePrice = 2000;
        increaseRate = 1.05;
        break;
      case 'influencerCourse':
        basePrice = 2500;
        increaseRate = 1.05;
        break;
      default:
        basePrice = 0;
        increaseRate = 1;
    }

    const itemQuantity = stats[itemType];
    if (itemQuantity > 0) {
      const price = basePrice * Math.pow(increaseRate, itemQuantity);
      return Math.round(price);
    } else {
      return basePrice;
    }
  };
  const purchasedUpgradesCount = stats.upgrades.filter(upgrade => upgrade.purchased).length;
  const totalUpgradesCount = stats.upgrades.length;
  return (
    <div className="resources">
      <p>Motivation: {stats.motivation.toFixed(2)}   ({MotivationPerSecond(stats).toFixed(2)} /sec)<button onClick={hypeUp}>Hype up</button></p>
     <button onClick={()=> setView('Items') }> Items </button>      <button onClick={()=> setView('Upgrades') }> Upgrades {purchasedUpgradesCount} /  {totalUpgradesCount}  </button>
      {view === 'Items' && (
      <div>
       <div>
        <p>
          Foam Finger (+{(stats.foamfinger * 1 * stats.achievementMultiplier ).toFixed(2)} /click):
          {stats.foamfinger} --- {calculatePrice('foamfinger')}
          <button onClick={() => buyItem('foamfinger')}>Buy Foam Finger</button>
        </p>
      </div>
     <div>
        <p>
          Motivation Poster (+{(stats.motivationPoster * 1 * stats.achievementMultiplier).toFixed(2)}/sec):
          {stats.motivationPoster} --- {calculatePrice('motivationPoster')}
          <button onClick={() => buyItem('motivationPoster')}>Buy Motivation Poster</button>
        </p>
      </div>
      <div>
        <p>
          Self Help Book (+{(stats.selfHelpBook * 10 * stats.achievementMultiplier).toFixed(2)}/sec):
          {stats.selfHelpBook} --- {calculatePrice('selfHelpBook')}
          <button onClick={() => buyItem('selfHelpBook')}>Buy Self Help Book</button>
        </p>
      </div>
      <div>
        <p>
          Meditation Guide (+{(stats.meditationGuide * 20 * stats.achievementMultiplier).toFixed(2)}/sec):
          {stats.meditationGuide} --- {calculatePrice('meditationGuide')}
          <button onClick={() => buyItem('meditationGuide')}>Buy Meditation Guide</button>
        </p>
      </div>
      <div>
        <p>
          Yoga Mat (+{(stats.yogaMat * 25 * stats.achievementMultiplier).toFixed(2)}/sec):
          {stats.yogaMat} --- {calculatePrice('yogaMat')}
          <button onClick={() => buyItem('yogaMat')}>Buy Yoga Mat</button>
        </p>
      </div>
      <div>
        <p>
          Energy Drink (+{(stats.energyDrink * 30 * stats.achievementMultiplier).toFixed(2)}/sec):
          {stats.energyDrink} --- {calculatePrice('energyDrink')}
          <button onClick={() => buyItem('energyDrink')}>Buy Energy Drink</button>
        </p>
      </div>
      <div>
        <p>
          Influencer Course (+{(stats.influencerCourse * 50 * stats.achievementMultiplier).toFixed(2)}/sec):
          {stats.influencerCourse} --- {calculatePrice('influencerCourse')}
          <button onClick={() => buyItem('influencerCourse')}>Buy Influencer Course</button>
        </p>
      </div>
      </div>
      )}
      {view === 'Upgrades' && (
        <div>
          {stats?.upgrades
            .filter(upgrade => upgrade.type === 'motivation')
            .map((upgrade, index) => (
              <div key={index}>
                <p>
                  {upgrade.name}: {upgrade.price}
                  <button disabled={upgrade.purchased} onClick={() => buyUpgrade(upgrade)}>
                    {upgrade.purchased ? "Purchased" : "Purchase"}
                  </button>
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Energize;
