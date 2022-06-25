import React from 'react';

import Card from '../card/Card';

const CardList = ({cards}) => {  

  return (
    <>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
        />
      ))}
    </>
  );
}
 
export default CardList;