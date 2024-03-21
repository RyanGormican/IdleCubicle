import React, { useState } from 'react';
import './App.css';
import { Icon } from '@iconify/react';
import Resources from './components/Resources';
function App() {
 const [stats, setStats] = useState({
    inspiration: 0,
    creativity: 0,
    motivation: 0,
    knowledge: 0,

  });

  return (
    <div className="App">

      <header className="Background">
      <div className="title">
      IdleCubicle
      </div>
       <Resources stats={stats}/>
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
          </header>
    </div>
  );
}

export default App;
