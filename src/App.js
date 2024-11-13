import React, { useState, useEffect } from 'react';
import './App.css';
import { Icon } from '@iconify/react';
import Resources from './components/Resources';
import Energize from './components/Energize';
import Educate from './components/Educate';
import Achievements from './components/Achievements';
import Skills from './components/Skills';
import Application from './components/Application';
import {settings} from './components/Settings';
import Settings from './components/Settings';
import Prestige from './components/Prestige';
import Networking from './components/Networking';
import { upgrades } from './components/Upgrades'; 
import { achievements } from './components/AchievementList'; 
import {buyItem,calculatePrice} from './components/Utilities';
import { MotivationPerSecond, InspirationPerSecond,CreativityPerSecond,KnowledgePerSecond, SocialPerSecond,WritingPerSecond ,MoneyPerSecond } from './components/Calculations';

function App() {
  const initialStats = {
    inspiration: 0,
    creative: 0,
    motivation: 0,
    knowledge: 0,
    money: 0,
    social: 0,
    motivationPoster: 0,
    achievementMultiplier: 1.0,
    selfHelpBook: 0,
    explore:0,
    draw:0,
    books:0,
    talking:0,
    writing:0,
    pencil:0,
    motivationPoints:0,
    writingPoints:0,
    meditationGuide:0,
    yogaMat:0,
    energyDrink:0,
    influencerCourse:0,
    foamfinger:0,
    goldstars:0,
    socialPoints:0,
    connections:[],
    ...upgrades,
    ...settings,
    ...achievements,
  };

  const [currentUpgradeIndex, setCurrentUpgradeIndex] = useState(0);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [stats, setStats] = useState(() => {
    const savedStats = localStorage.getItem('idlecubicle');
    return savedStats ? JSON.parse(savedStats) : initialStats;
  });
  const [view, setView] = useState('Resources');
  const [underConstruction, setUnderConstruction] = useState(false); // New state for under construction

  const handleViewChange = (view) => {
    setView(view);
  };

  const handleToggleUnderConstruction = () => {
    setUnderConstruction(!underConstruction); // Toggle the construction state
  };

  useEffect(() => {
    localStorage.setItem('idlecubicle', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    const interval = setInterval(() => {
      const autoUpgrades = [
        'Auto Finger',
        'Auto Motivation Poster',
        'Auto Self Help Book',
        'Auto Meditation Guide',
        'Auto Yoga Mat',
        'Auto Energy Drink',
        'Auto Influencer Course'
      ];
      const upgradeName = autoUpgrades[currentUpgradeIndex];
      const upgrade = stats.upgrades.find(upgrade => upgrade.name === upgradeName && upgrade.purchased);
      const buyUpgrade = () => {
        if (upgrade && stats.motivation >= calculatePrice(upgrade.area, purchaseQuantity, stats)) {
          buyItem(upgrade.area, stats, purchaseQuantity, setStats);
        }
      };
      buyUpgrade();
      setCurrentUpgradeIndex((currentUpgradeIndex + 1) % autoUpgrades.length); 
    }, 1000);

    return () => clearInterval(interval);
  }, [stats]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => ({
        ...prevStats,
        motivation: (prevStats.motivation + MotivationPerSecond(stats)),
        inspiration: (prevStats.inspiration + InspirationPerSecond(stats)),
        creativity: (prevStats.creativity + CreativityPerSecond(stats)),
        knowledge: (prevStats.knowledge + KnowledgePerSecond(stats)),
        social: (prevStats.social + SocialPerSecond(stats)),
        writing: (prevStats.writing + WritingPerSecond(stats)),
        money: (prevStats.money + MoneyPerSecond(stats))
      }));
    }, 1000);

    return () => clearInterval(interval); 
  }, [stats]);

  return (
    <div className="App">
      <div className="Background">
        <div className="title"><Icon icon="material-symbols:desk" /> IdleCubicle <Icon icon="material-symbols:desk" /></div>

  

        {underConstruction ? (
          // Show only links and "Under Construction" message
          <div className="under-construction">
            <h2>UNDER CONSTRUCTION</h2>
            <div className="links">
              <a href="https://www.linkedin.com/in/ryangormican/">
                <Icon icon="mdi:linkedin" color="#0e76a8" width="60" />
              </a>
              <a href="https://github.com/RyanGormican/IdleCubicle">
                <Icon icon="mdi:github" color="#e8eaea" width="60" />
              </a>
              <a href="https://ryangormicanportfoliohub.vercel.app/">
                <Icon icon="teenyicons:computer-outline" color="#199c35" width="60" />
              </a>
            </div>
          </div>
        ) : (
          // Show the full app if not under construction
          <div>
            <div className="buttons">
              <button
                className={`btn btn-primary btn-large mr-2 ${view === 'Resources' ? 'selected' : ''}`}
                onClick={() => handleViewChange('Resources')}
              >
                Resources
              </button>
              <button
                className={`btn btn-primary mr-2 ${view === 'Energize' ? 'selected' : ''}`}
                onClick={() => handleViewChange('Energize')}
              >
                Energize
              </button>
              <button
                className={`btn btn-primary mr-2 ${view === 'Educate' ? 'selected' : ''}`}
                onClick={() => handleViewChange('Educate')}
              >
                Educate
              </button>
              <button
                className={`btn btn-primary mr-2 ${view === 'Skills' ? 'selected' : ''}`}
                onClick={() => handleViewChange('Skills')}
              >
                Skills
              </button>
              <button
                className={`btn btn-primary mr-2 ${view === 'Application' ? 'selected' : ''}`}
                onClick={() => handleViewChange('Application')}
              >
                Application
              </button>
              <button
                className={`btn btn-primary mr-2 ${view === 'Achievements' ? 'selected' : ''}`}
                onClick={() => handleViewChange('Achievements')}
              >
                Achievements
              </button>
              <button
                className={`btn btn-primary mr-2 ${view === 'Networking' ? 'selected' : ''}`}
                onClick={() => handleViewChange('Networking')}
              >
                Networking
              </button>
              <button
                className={`btn btn-primary ${view === 'Settings' ? 'selected' : ''}`}
                onClick={() => handleViewChange('Settings')}
              >
                Settings
              </button>
              <button
                className={`btn btn-primary ${view === 'Prestige' ? 'selected' : ''}`}
                onClick={() => handleViewChange('Prestige')}
              >
                Prestige
              </button>
            </div>

            <div className="purchase-quantity-buttons">
  {[1, 5, 10, 25, 50, 100, 250, 500, 1000, 'MAX'].map((quantity) => (
    <button
      key={quantity}
      className={purchaseQuantity === quantity ? 'selected' : ''}
      onClick={() => handlePurchaseQuantityChange(quantity)}
    >
      {quantity}x
    </button>
  ))}
</div>


            <div>
              {view === 'Resources' && <Resources stats={stats} setStats={setStats} />}
              {view === 'Energize' && <Energize stats={stats} setStats={setStats} purchaseQuantity={purchaseQuantity} />}
              {view === 'Educate' && <Educate stats={stats} setStats={setStats} purchaseQuantity={purchaseQuantity} />}
              {view === 'Achievements' && <Achievements stats={stats} setStats={setStats} />}
              {view === 'Skills' && <Skills stats={stats} setStats={setStats} purchaseQuantity={purchaseQuantity} />}
              {view === 'Application' && <Application stats={stats} setStats={setStats} purchaseQuantity={purchaseQuantity} />}
              {view === 'Networking' && <Networking stats={stats} setStats={setStats} />}
              {view === 'Settings' && <Settings stats={stats} setStats={setStats} />}
              {view === 'Prestige' && <Prestige stats={stats} setStats={setStats} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
