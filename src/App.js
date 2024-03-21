import React, { useState, useEffect } from 'react';
import './App.css';
import { Icon } from '@iconify/react';
import Resources from './components/Resources';
import Energize from './components/Energize';
import Educate from './components/Educate';
import Achievements from './components/Achievements';
import { MotivationPerSecond } from './components/Calculations';

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
  };

  const [stats, setStats] = useState(() => {
    const savedStats = localStorage.getItem('idlecubicle');
    return savedStats ? JSON.parse(savedStats) : initialStats;
  });

  useEffect(() => {
    localStorage.setItem('idlecubicle', JSON.stringify(stats));
  }, [stats]);

  const [view, setView] = useState('Resources');

  const handleViewChange = (view) => {
    setView(view);
  };
    useEffect(() => {
 

    
    const interval = setInterval(() => {
      setStats(prevStats => ({
        ...prevStats,
        motivation: ( prevStats.motivation + ( 1*(stats.motivationPoster)+ 10*(stats.selfHelpBook) ) * stats.achievementMultiplier  -  (stats.explore + stats.draw+stats.books+stats.talking)) ,
        inspiration:(prevStats.inspiration + (1*(stats.explore)) * stats.achievementMultiplier),
        creativity:(prevStats.creativity + (1*(stats.draw)) * stats.achievementMultiplier),
        knowledge:(prevStats.knowledge + (1*(stats.books)) * stats.achievementMultiplier),
        social:(prevStats.social + (1*(stats.talking)) * stats.achievementMultiplier),
      }));

    }, 1000); 

    return () => clearInterval(interval); 
  }, [stats]);
  return (
    <div className="App">
        <div className="Background">
          <div className="title">IdleCubicle</div>
          <div className="buttons">
            <button
              className="btn btn-primary btn-large mr-2"
              onClick={() => handleViewChange('Resources')}
            >
              Resources
            </button>
             <button
              className="btn btn-primary mr-2"
              onClick={() => handleViewChange('Energize')}
            >
            Energize
            </button>
            <button
              className="btn btn-primary mr-2"
              onClick={() => handleViewChange('Educate')}
            >
              Educate
            </button>
            <button
              className="btn btn-primary mr-2"
              onClick={() => handleViewChange('Skills')}
            >
              Skills
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleViewChange('Application')}
            >
              Application
            </button>
             <button
              className="btn btn-primary"
              onClick={() => handleViewChange('Achievements')}
            >
              Achievements
            </button>
          </div>
          <div>
          {view === 'Resources' && (
            <Resources stats={stats} setStats={setStats} />
          )}
          {view === 'Energize' && (
            <Energize stats={stats} setStats={setStats} />
          )}
          {view === 'Educate' && (
            <Educate stats={stats} setStats={setStats} />
          )}
           {view === 'Achievements' && (
            <Achievements stats={stats} setStats={setStats} />
          )}
          </div>
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
    </div>
  );
}

export default App;
