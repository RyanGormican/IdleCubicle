import React, { useState } from 'react';
import {Tooltip} from 'react-tooltip';
import { MotivationPerSecond } from './Calculations';
import { Icon } from '@iconify/react';
const Energize = ({ stats, setStats, purchaseQuantity }) => {
  const [view, setView] = useState('Items');
  const buyUpgrade = (upgrade) => {
    const currentPrice = upgrade.price;
    if (stats.motivation >= currentPrice && !upgrade.purchased && purchaseQuantity) {
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
  const getIcon = (area) => {
  switch (area) {
    case 'foamfinger':
      return 'tabler:hand-finger';
    case 'motivationPoster':
      return 'akar-icons:paper';
    case 'selfHelpBook':
      return 'material-symbols:book';
    case 'meditationGuide':
      return 'mdi:tape';
    case 'yogaMat':
      return 'tabler:yoga';
    case 'energyDrink':
      return 'game-icons:soda-can';
    case 'influencerCourse':
      return 'material-symbols:person';
    default:
      return null;
  }
};

const purchaseAvailableUpgrades = () => {
  const availableUpgrades = stats.upgrades.filter(upgrade => !upgrade.purchased);
  availableUpgrades.sort((a, b) => a.price - b.price);

  let remainingMotivation = stats.motivation;

  for (const upgrade of availableUpgrades) {
    const currentPrice = upgrade.price;
    if (remainingMotivation >= currentPrice) {
      remainingMotivation -= currentPrice;
      setStats(prevStats => ({
        ...prevStats,
        motivation: remainingMotivation,
        upgrades: prevStats.upgrades.map(item => {
          if (item.name === upgrade.name) {
            return { ...item, purchased: true };
          }
          return item;
        })
      }));
    } else {
      break;
    }
  }
};
  const calculateMax = (itemType) => {
  let basePrice, increaseRate;
  switch (itemType) {
    case 'foamfinger':
      basePrice = 50;
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

  let totalPrice = 0;
  let remainingMotivation = stats.motivation;
  let itemQuantity = stats[itemType];
  while (remainingMotivation >= basePrice) {
    const price = basePrice * Math.pow(increaseRate, itemQuantity);
    if (price <= remainingMotivation) {
      totalPrice += Math.round(price);
      remainingMotivation -= price;
      itemQuantity++;
    } else {
      break;
    }
  }
  return itemQuantity - stats[itemType];
};

 
  const buyItem = (itemType) => {
    const currentPrice = calculatePrice(itemType);
    if (stats.motivation >= currentPrice  && purchaseQuantity !== 'MAX') {
      setStats(prevStats => ({
        ...prevStats,
        motivation: prevStats.motivation - currentPrice,
        [itemType]: prevStats[itemType] + purchaseQuantity,
      }));
    }else if (stats.motivation >= currentPrice && purchaseQuantity === 'MAX') {
      setStats(prevStats => ({
        ...prevStats,
        motivation: prevStats.motivation - currentPrice,
        [itemType]: prevStats[itemType] + calculateMax(itemType),
      }));
    } else {
      alert("Not enough motivation to buy!");
    }
  };
  const totalFoamFingerEffect = stats.upgrades
  .filter(upgrade => upgrade.area === 'foamfinger' && upgrade.purchased)
  .reduce((total, upgrade) => total + upgrade.effect, 0);

 
  const hypeUp = () => {
    setStats(prevStats => ({
      ...prevStats,
      motivation: prevStats.motivation + ((1 + (1+totalFoamFingerEffect) * stats.foamfinger ) * stats.achievementMultiplier),
    }));
  };

 const calculatePrice = (itemType) => {
  let basePrice, increaseRate;
  switch (itemType) {
    case 'foamfinger':
      basePrice = 50;
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

  if (purchaseQuantity === 'MAX') {
    let totalPrice = 0;
    let remainingMotivation = stats.motivation;
    let itemQuantity = stats[itemType];
    while (remainingMotivation >= basePrice) {
      const price = basePrice * Math.pow(increaseRate, itemQuantity);
      if (price <= remainingMotivation) {
        totalPrice += Math.round(price);
        remainingMotivation -= price;
        itemQuantity++;
      } else {
        break;
      }
    }
    return totalPrice;
  } else {
    let totalPrice = 0;
    for (let i = 0; i < purchaseQuantity; i++) {
      const itemQuantity = stats[itemType] + i;
      const price = basePrice * Math.pow(increaseRate, itemQuantity);
      totalPrice += Math.round(price);
    }
    return totalPrice;
    }
};

  const purchasedUpgradesCount = stats.upgrades.filter(upgrade => upgrade.purchased).length;
  const totalUpgradesCount = stats.upgrades.length;

  return (
    <div className="resources">
      <p>Motivation: {stats.motivation.toFixed(2)} ({MotivationPerSecond(stats).toFixed(2)} /sec)</p>
     <div>
     <button onClick={hypeUp}>Hype up</button>
     </div>
      <button onClick={() => setView('Items')}>Items</button> <button onClick={() => setView('Upgrades')}>Upgrades {purchasedUpgradesCount} / {totalUpgradesCount}</button>
      {view === 'Items' && (
       <div>
  <div>
    <p>
             <Icon icon={getIcon('foamfinger')} width="30" />   Foam Finger (+{(stats.foamfinger * (1 + totalFoamFingerEffect) * stats.achievementMultiplier).toFixed(2)} /click):
      {stats.foamfinger} --- {purchaseQuantity === 'MAX' ? `${calculatePrice('foamfinger')} (${calculateMax('foamfinger')})` : calculatePrice('foamfinger')}
      <button onClick={() => buyItem('foamfinger')}>Buy Foam Finger</button>
    </p>
  </div>
  <div>
    <p>
            <Icon icon={getIcon('motivationPoster')} width="30" />   Motivation Poster (+{(stats.motivationPoster * 1 * stats.achievementMultiplier).toFixed(2)}/sec):
      {stats.motivationPoster} --- {purchaseQuantity === 'MAX' ? `${calculatePrice('motivationPoster')} (${calculateMax('motivationPoster')})` : calculatePrice('motivationPoster')}
      <button onClick={() => buyItem('motivationPoster')}>Buy Motivation Poster</button>
    </p>
  </div>
  <div>
    <p>
            <Icon icon={getIcon('selfHelpBook')} width="30" />    Self Help Book (+{(stats.selfHelpBook * 10 * stats.achievementMultiplier).toFixed(2)}/sec):
      {stats.selfHelpBook} --- {purchaseQuantity === 'MAX' ? `${calculatePrice('selfHelpBook')} (${calculateMax('selfHelpBook')})` : calculatePrice('selfHelpBook')}
      <button onClick={() => buyItem('selfHelpBook')}>Buy Self Help Book</button>
    </p>
  </div>
  <div>
    <p>
        <Icon icon={getIcon('meditationGuide')} width="30" />    Meditation Guide (+{(stats.meditationGuide * 20 * stats.achievementMultiplier).toFixed(2)}/sec):
      {stats.meditationGuide} --- {purchaseQuantity === 'MAX' ? `${calculatePrice('meditationGuide')} (${calculateMax('meditationGuide')})` : calculatePrice('meditationGuide')}
      <button onClick={() => buyItem('meditationGuide')}>Buy Meditation Guide</button>
    </p>
  </div>
  <div>
    <p>
       <Icon icon={getIcon('yogaMat')} width="30" />  Yoga Mat (+{(stats.yogaMat * 25 * stats.achievementMultiplier).toFixed(2)}/sec):
      {stats.yogaMat} --- {purchaseQuantity === 'MAX' ? `${calculatePrice('yogaMat')}(${calculateMax('yogaMat')})` : calculatePrice('yogaMat')}
      <button onClick={() => buyItem('yogaMat')}>Buy Yoga Mat</button>
    </p>
  </div>
  <div>
    <p>
             <Icon icon={getIcon('energyDrink')} width="30" />   Energy Drink (+{(stats.energyDrink * 30 * stats.achievementMultiplier).toFixed(2)}/sec):
      {stats.energyDrink} --- {purchaseQuantity === 'MAX' ? `${calculatePrice('energyDrink')}(${calculateMax('energyDrink')})` : calculatePrice('energyDrink')}
      <button onClick={() => buyItem('energyDrink')}>Buy Energy Drink</button>
    </p>
  </div>
  <div>
    <p>
            <Icon icon={getIcon('influencerCourse')} width="30" />   Influencer Course (+{(stats.influencerCourse * 50 * stats.achievementMultiplier).toFixed(2)}/sec):
      {stats.influencerCourse} --- {purchaseQuantity === 'MAX' ? `${calculatePrice('influencerCourse')} (${calculateMax('influencerCourse')})` : calculatePrice('influencerCourse')}
      <button onClick={() => buyItem('influencerCourse')}>Buy Influencer Course</button>
    </p>
  </div>
</div>

      )}
        {view === 'Upgrades' && (
        <div>
          <div>
            <button onClick={() => purchaseAvailableUpgrades()}> Purchase Available Upgrades</button>
          </div>
          {stats?.upgrades
            .filter(upgrade => upgrade.type === 'motivation')
            .filter(upgrade => !stats.settings.find(setting => setting.name === "Hide Purchased Upgrades").status || !upgrade.purchased)
            .sort((a, b) => a.price - b.price)
            .map((upgrade, index) => (
              <div key={index} className="upgrade-container">
                <p className="upgrade-info">
                  <Icon icon={getIcon(upgrade.area)} width="30" />
                  {upgrade.name}: {upgrade.price}
                  <button disabled={upgrade.purchased} onClick={() => buyUpgrade(upgrade)}>
                    {upgrade.purchased ? "Purchased" : "Purchase"}
                  </button>
                  <span className="tooltip-text">{upgrade.description}</span>
                </p>
              </div>
            ))}
  </div>
)}


    </div>
  );
};

export default Energize;