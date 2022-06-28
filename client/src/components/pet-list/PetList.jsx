import React from 'react';
import Pet from '../pet/Pet';
import './petList.css';
import AddPetModal from '../modals/adicionar-pet.modal'



const PetList = ({ pets }) => {
  const userId = '4ac85347-72f7-48e5-a469-eac17735e0c4';
  return (
    <div>
      <hr/>
      <div className='petListHeader'>
        <h3>Lista de Pets</h3>
        <AddPetModal userId={userId} />              
      </div>      
      <div className='mainContent'>
        {pets.map((pet) => (
          <Pet
            key={pet.id}
            pet={pet}
          />
        ))}
      </div>
    </div>
  );
}

export default PetList;