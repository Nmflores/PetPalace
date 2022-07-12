import React from 'react';
import Pet from '../pet/Pet';
import './petList.css';
import AddPetModal from '../modals/adicionar-pet.modal'

function RendeBaseOnPets({ userId, pets, callbackPetAdded, callbackPetDeleted }) {
  console.log(pets)
  if (pets.length > 0) {
    return (
      <div>
        <div className='petListHeader'>
          <h3>Lista de Pets</h3>
          <AddPetModal userId={userId} callbackPetAdded={callbackPetAdded} />
        </div>
        <hr />
        <div className='mainContent'>
          {pets.map((pet) => (
            <Pet
              key={pet.id}
              pet={pet}
              callbackPetDeleted={callbackPetDeleted}
            />
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div className='petListHeader'>
          <h3>Lista de Pets</h3>
          <AddPetModal userId={userId} callbackPetAdded={callbackPetAdded} />
        </div>
        <hr />
        <div>Nenhum pet cadastrado</div>
      </div>
    )
  }
}

const PetList = ({ pets, callbackPetAdded, callbackPetDeleted }) => {
  const userId = localStorage.getItem("userId");
  return (
    <div>
      <RendeBaseOnPets 
        userId={userId} 
        pets={pets} 
        callbackPetAdded={callbackPetAdded} 
        callbackPetDeleted={callbackPetDeleted}
      />
    </div>
  );
}

export default PetList;