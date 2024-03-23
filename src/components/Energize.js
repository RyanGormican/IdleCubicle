import React, { useState } from 'react';
import {Tooltip} from 'react-tooltip';
import { MotivationPerSecond } from './Calculations';

const Energize = ({ stats, setStats }) => {
  const [view, setView] = useState('Items');
   const [purchaseQuantity, setPurchaseQuantity] = useState(1);
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

   const handlePurchaseQuantityChange = (quantity) => {
    setPurchaseQuantity(quantity);
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
      <p>Motivation: {stats.motivation.toFixed(2)} ({MotivationPerSecond(stats).toFixed(2)} /sec)<button onClick={hypeUp}>Hype up</button></p>
       <div className="purchase-quantity-buttons">
  <button className={purchaseQuantity === 1 ? 'selected' : ''} onClick={() => handlePurchaseQuantityChange(1)}>1x</button>
  <button className={purchaseQuantity === 5 ? 'selected' : ''} onClick={() => handlePurchaseQuantityChange(5)}>5x</button>
  <button className={purchaseQuantity === 10 ? 'selected' : ''} onClick={() => handlePurchaseQuantityChange(10)}>10x</button>
  <button className={purchaseQuantity === 'MAX' ? 'selected' : ''} onClick={() => handlePurchaseQuantityChange('MAX')}>MAX</button>
      </div>
      <button onClick={() => setView('Items')}>Items</button> <button onClick={() => setView('Upgrades')}>Upgrades {purchasedUpgradesCount} / {totalUpgradesCount}</button>
      {view === 'Items' && (
        <div>
          <div>
            <p>
              Foam Finger (+{(stats.foamfinger *( 1 + totalFoamFingerEffect)* stats.achievementMultiplier).toFixed(2)} /click):
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
            .sort((a, b) => a.price - b.price)
            .map((upgrade, index) => (
              <div key={index} className="upgrade-container">
                <p className="upgrade-info">
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