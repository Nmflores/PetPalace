import React from 'react';
import Pet from '../pet/Pet';
import './petList.css';

const PetList = ({pets}) => {
  return (
    <div className='mainContent'>
      {pets.map((pet) => (
        <Pet 
          key={pet.id}
          pet={pet} 
        />
      ))}      
    </div>
  );
}
 
export default PetList;