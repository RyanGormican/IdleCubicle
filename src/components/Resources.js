import React, { useState, useEffect} from 'react';

const Resources = ({stats,setStats}) => {

return (
    <div className="resources">
      <div>
        {Object.entries(stats).map(([statName, statValue]) => (
          <p key={statName}>
            {statName.charAt(0).toUpperCase() + statName.slice(1)}: {statValue?.toFixed(2)}
          </p>
        ))}
      </div>
    </div>
)};
export default Resources;