import React from 'react';
import { Icon } from '@iconify/react';

const Prestige = ({ stats, setStats }) => {
  const availableStars = Math.floor(stats.money / 10000);
  const prestige = () => {
    const resetStats = {
      goldstars: stats.goldstars + availableStars,
      upgrades: stats.upgrades.map(upgrade => ({
        ...upgrade,
        purchased: upgrade.type === 'prestige' ? upgrade.purchased : false,
      })),
      achievementMultiplier: 1,
      settings: stats.settings,
    };

    for (const key in stats) {
      if (!['goldstars', 'upgrades', 'achievementMultiplier','settings'].includes(key)) {
        resetStats[key] = 0;
      }
    }

    setStats(resetStats);
  };

const purchaseAvailableUpgrades = () => {
  const availableUpgrades = stats.upgrades.filter(upgrade => !upgrade.purchased && upgrade.type === 'prestige');
  availableUpgrades.sort((a, b) => a.price - b.price);

  let remainingStars = stats.goldstars;
  for (const upgrade of availableUpgrades) {
    const currentPrice = upgrade.price;
    if (remainingStars >= currentPrice) {
      remainingStars -= currentPrice;
      setStats(prevStats => ({
        ...prevStats,
        goldstars: remainingStars,
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
 const buyUpgrade = (upgrade) => {
    const currentPrice = upgrade.price;
    if (stats.goldstars >= currentPrice && !upgrade.purchased) {
      setStats(prevStats => ({
        ...prevStats,
        goldstars: prevStats.goldstars - currentPrice,
        upgrades: prevStats.upgrades.map(item => {
          if (item.name === upgrade.name) {
            return { ...item, purchased: true };
          }
          return item;
        })
      }));
    } else {
      alert("Not enough stars!");
    }
  };
 const getIcon = (area) => {
  switch (area) {
    case 'click':
    return 'tabler:click';
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
  return (
    <div className="resources">
    Money - {stats.money}
    <div>
        Available Gold Stars - {stats.goldstars}
    </div>
    <div>
    Prestige Gold Stars - {availableStars}

    </div>
    <button  disabled={availableStars < 1} onClick={() => prestige()}> Prestige</button>

    <div>

    </div>
        <div>
          <div>
            <button onClick={() => purchaseAvailableUpgrades()}> Purchase Available Upgrades</button>
          </div>
          {stats?.upgrades
            .filter(upgrade => upgrade.type === 'prestige')
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

    </div>
  );
};

export default Prestige;
