import { React, useState, useEffect } from 'react';
import useCollapse from "react-collapsed";
import { Button } from 'react-bootstrap';

import './Card.css';
import {ProfilePicture, } from '../';
import iconCat from '../../assets/cat-icon.png';
import iconDog from '../../assets/dog-icon.png';

const Card = ({card, isActive}) => {

  const [isExpanded, setExpanded] = useState(isActive);
  const { getToggleProps, getCollapseProps } = useCollapse({
    isExpanded
  });

  useEffect(() => {
    setExpanded(isActive);
  }, [isActive, setExpanded]);

  return ( 
    <>    
      <div 
        className='card-container'
        {...getToggleProps({
          onClick: () => setExpanded((x) => !x)
        })}            
      >
        <ProfilePicture />
        <div className='card-description'>
          <h2>{card.name}</h2>
          <h3>{card.title}</h3>  
          <div className='pet-container'>
            {card.petTypes.map(element => (
              <img 
                className='petIcon'
                src={element.petType==='C' ? iconCat : iconDog} 
                alt="Pet icon"
              />
            ))}
          </div>        
        </div>
        <div className='price'>
          <h3>R$ {card.price}</h3>
        </div>      
      </div>
      <div 
      {...getCollapseProps()}
      className='details'
      >
        <h3>Telefone: {card.fone}</h3>
        <Button>{card.status === 0 ? 'Contratar' : 'Dispensar'}</Button>
      </div>
    </>
   );
}
 
export default Card;