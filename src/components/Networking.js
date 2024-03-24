import React, { useState, useEffect } from 'react';
import { names } from './Names'; 
const Networking = ({ stats, setStats }) => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [view,setView] = useState('Connections');
  useEffect(() => {
    const interval = setInterval(() => {

      const drawResult = Math.random() < stats.socialPoints / 100;

   
      if (drawResult) {
        const newRequest = {
          ...generateRequestData(),
          profession: generateProfession(),
          company: generateCompany()
        };

        setPendingRequests(prevRequests => [...prevRequests, newRequest]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [stats.socialPoints]);


const generateRequestData = () => {
  const firstNames = names.filter(({ type }) => type === 'First Name');
  const lastNames = names.filter(({ type }) => type === 'Last Name');

  const randomFirstNameIndex = Math.floor(Math.random() * firstNames.length);
  const randomLastNameIndex = Math.floor(Math.random() * lastNames.length);

  const randomFirstName = firstNames[randomFirstNameIndex].name;
  const randomLastName = lastNames[randomLastNameIndex].name;

  return {
    name: `${randomFirstName} ${randomLastName}`,
  };
};
const generateProfession = () => {
  const professions = names.filter(({ type }) => type === 'Profession');
  const randomIndex = Math.floor(Math.random() * professions.length);
  return professions[randomIndex] ? professions[randomIndex].name : 'Professional';
};

const generateCompany = () => {
  const companies = names.filter(({ type }) => type === 'Company');
  const randomIndex = Math.floor(Math.random() * companies.length);
  return companies[randomIndex] ? companies[randomIndex].name : "Joe's Stuff";
};


  return (
    <div className="resources">
      <p>Social Points - {stats.socialPoints}</p>
      <p>Pending Requests: {pendingRequests.length}</p>
      <ul>
        {pendingRequests.map((request, index) => (
          <div key={index}>
            {request.name} - {request.profession} at {request.company}
              <div>
             <button> Accept </button>    <button> Decline </button>
          </div>
          </div>
     
        ))}
      </ul>
    </div>
  );
};

export default Networking;
