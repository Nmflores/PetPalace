import React from 'react';

import './Card.css';
import {ProfilePicture, } from '../';

const Card = ({card}) => {
  return ( 
    <div className='card-container'>
      <ProfilePicture />
      <div className='card-description'>
        <h2>{card.name}</h2>
        <h3>{card.title}</h3>  
        <div className='pet-container'>
          {card.petTypes.map(element => (
            <p>{element.petType}</p>
          ))}
        </div>        
      </div>
      <div className='price'>
        <h3>R$ {card.price}</h3>
      </div>      
    </div>
   );
}
 
export default Card;