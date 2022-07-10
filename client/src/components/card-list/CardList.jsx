import React from 'react';

import Card from '../card/Card';

const CardList = ({services}) => {  

  return (
    <>
      {services.map((service) => (
        <Card
          key={service.service_id}
          service={service}
        />
      ))}
    </>
  );
}
 
export default CardList;