import React from 'react';
import iconCat from '../../assets/cat-icon.png';
import iconDog from '../../assets/dog-icon.png';
import './pet.css';

const Pet = ({pet}) => {

  let petIcon = pet.type==='C' ? iconCat : iconDog

  return (
    <div className='petList'>
      <p>{pet.name}</p>
      <img 
        className='petIcon'
        src={petIcon} 
        alt="Pet icon" 
      />
    </div>      
  );
}
 
export default Pet;