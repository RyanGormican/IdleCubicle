import React, { useState, useEffect } from 'react';
import {Tooltip} from 'react-tooltip';
import { MotivationPerSecond } from './Calculations';
import { Icon } from '@iconify/react';
import {getIcon, calculatePrice, buyItem, calculateMax} from './Utilities';
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

const purchaseAvailableUpgrades = () => {
  const availableUpgrades = stats.upgrades.filter(upgrade => !upgrade.purchased && upgrade.type === 'motivation');
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
const calculateHypePrestige = () => {
  let hypeUp = 1;
  stats.upgrades
    .filter(upgrade => upgrade.type === 'prestige' && upgrade.area === 'click' && upgrade.purchased)
    .forEach(upgrade => {
      hypeUp *= upgrade.effect;
    });
  return hypeUp;
};




 
  const totalFoamFingerEffect = stats.upgrades
  .filter(upgrade => upgrade.area === 'foamfinger' && upgrade.purchased)
  .reduce((total, upgrade) => total + upgrade.effect, 0);

 
  const hypeUp = () => {
    setStats(prevStats => ({
      ...prevStats,
      motivation: prevStats.motivation + ((1 + (1+totalFoamFingerEffect) * stats.foamfinger ) * calculateHypePrestige() * stats.achievementMultiplier),
    }));
  };



  const purchasedUpgradesCount = stats.upgrades.filter(upgrade => upgrade.purchased && upgrade.type === 'motivation').length;
  const totalUpgradesCount = stats.upgrades.filter(upgrade => upgrade.type === 'motivation').length;

  return (
    <div className="resources">
      <p> <Icon icon={getIcon('motivation')} width="30" /> Motivation: {stats.motivation.toFixed(2)} ({MotivationPerSecond(stats).toFixed(2)} /sec)</p>
     <div>
    <Icon icon={getIcon('click')} width="30" />   <button onClick={hypeUp}>Hype up</button>  <Icon icon={getIcon('click')} width="30" />
     </div>
      <button onClick={() => setView('Items')}>Items</button> <button onClick={() => setView('Upgrades')}>Upgrades {purchasedUpgradesCount} / {totalUpgradesCount}</button>
      {view === 'Items' && (
       <div>
  <div>
    <p>
             <Icon icon={getIcon('foamfinger')} width="30" />   Foam Finger (+{(stats.foamfinger * (1 + totalFoamFingerEffect) * calculateHypePrestige() *  stats.achievementMultiplier).toFixed(2)} /click):
      {stats.foamfinger} --- {purchaseQuantity === 'MAX' ? `${calculatePrice('foamfinger',purchaseQuantity,stats)} (${calculateMax('foamfinger',stats)})` : calculatePrice('foamfinger',purchaseQuantity,stats)}
      <button onClick={() => buyItem('foamfinger',stats,purchaseQuantity,setStats)}>Buy Foam Finger</button>
    </p>
  </div>
  <div>
    <p>
            <Icon icon={getIcon('motivationPoster')} width="30" />   Motivation Poster (+{(stats.motivationPoster * 1 * stats.achievementMultiplier).toFixed(2)}/sec):
      {stats.motivationPoster} --- {purchaseQuantity === 'MAX' ? `${calculatePrice('motivationPoster',purchaseQuantity,stats)} (${calculateMax('motivationPoster',stats)})` : calculatePrice('motivationPoster',purchaseQuantity,stats)}
      <button onClick={() => buyItem('motivationPoster',stats,purchaseQuantity,setStats)}>Buy Motivation Poster</button>
    </p>
  </div>
  <div>
    <p>
            <Icon icon={getIcon('selfHelpBook')} width="30" />    Self Help Book (+{(stats.selfHelpBook * 10 * stats.achievementMultiplier).toFixed(2)}/sec):
      {stats.selfHelpBook} --- {purchaseQuantity === 'MAX' ? `${calculatePrice('selfHelpBook',purchaseQuantity,stats)} (${calculateMax('selfHelpBook',stats)})` : calculatePrice('selfHelpBook',purchaseQuantity,stats)}
      <button onClick={() => buyItem('selfHelpBook',stats,purchaseQuantity,setStats)}>Buy Self Help Book</button>
    </p>
  </div>
  <div>
    <p>
        <Icon icon={getIcon('meditationGuide')} width="30" />    Meditation Guide (+{(stats.meditationGuide * 20 * stats.achievementMultiplier).toFixed(2)}/sec):
      {stats.meditationGuide} --- {purchaseQuantity === 'MAX' ? `${calculatePrice('meditationGuide',purchaseQuantity,stats)} (${calculateMax('meditationGuide',stats)})` : calculatePrice('meditationGuide',purchaseQuantity,stats)}
      <button onClick={() => buyItem('meditationGuide',stats,purchaseQuantity,setStats)}>Buy Meditation Guide</button>
    </p>
  </div>
  <div>
    <p>
       <Icon icon={getIcon('yogaMat')} width="30" />  Yoga Mat (+{(stats.yogaMat * 25 * stats.achievementMultiplier).toFixed(2)}/sec):
      {stats.yogaMat} --- {purchaseQuantity === 'MAX' ? `${calculatePrice('yogaMat',purchaseQuantity,stats)}(${calculateMax('yogaMat',stats)})` : calculatePrice('yogaMat',purchaseQuantity,stats)}
      <button onClick={() => buyItem('yogaMat',stats,purchaseQuantity,setStats)}>Buy Yoga Mat</button>
    </p>
  </div>
  <div>
    <p>
             <Icon icon={getIcon('energyDrink')} width="30" />   Energy Drink (+{(stats.energyDrink * 30 * stats.achievementMultiplier).toFixed(2)}/sec):
      {stats.energyDrink} --- {purchaseQuantity === 'MAX' ? `${calculatePrice('energyDrink',purchaseQuantity,stats)}(${calculateMax('energyDrink',stats)})` : calculatePrice('energyDrink',purchaseQuantity,stats)}
      <button onClick={() => buyItem('energyDrink',stats,purchaseQuantity,setStats)}>Buy Energy Drink</button>
    </p>
  </div>
  <div>
    <p>
            <Icon icon={getIcon('influencerCourse')} width="30" />   Influencer Course (+{(stats.influencerCourse * 50 * stats.achievementMultiplier).toFixed(2)}/sec):
      {stats.influencerCourse} --- {purchaseQuantity === 'MAX' ? `${calculatePrice('influencerCourse',purchaseQuantity,stats)} (${calculateMax('influencerCourse',stats)})` : calculatePrice('influencerCourse',purchaseQuantity,stats)}
      <button onClick={() => buyItem('influencerCourse',stats,purchaseQuantity,setStats)}>Buy Influencer Course</button>
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
