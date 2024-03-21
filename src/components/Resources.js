import React, { useState, useEffect} from 'react';

const Resources = ({stats,setStats}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => ({
        ...prevStats,
        motivation: prevStats.motivation + 1
      }));
    }, 1000); 

    return () => clearInterval(interval); 
  }, [setStats]);
return (
    <div className="resources">
      <h2>Resources:</h2>
      <div>
        {Object.entries(stats).map(([statName, statValue]) => (
          <p key={statName}>
            {statName.charAt(0).toUpperCase() + statName.slice(1)}: {statValue}
          </p>
        ))}
      </div>
    </div>
)};
export default Resources;