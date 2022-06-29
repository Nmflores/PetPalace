import React from 'react';
import Pet from '../pet/Pet';
import './petList.css';
import AddPetModal from '../modals/adicionar-pet.modal'

function RendeBaseOnPets({ userId, pets }) {
  console.log(pets)
  if (pets.length > 0) {
    return (
      <div>
        <div className='petListHeader'>
          <h3>Lista de Pets</h3>
          <AddPetModal userId={userId} />
        </div>
        <hr />
        <div className='mainContent'>
          {pets.map((pet) => (
            <Pet
              key={pet.id}
              pet={pet}
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
          <AddPetModal userId={userId} />
        </div>
        <hr />
        <div>Nenhum Pet cadastrado</div>
      </div>
    )
  }
}

const PetList = ({ pets }) => {
  const userId = localStorage.getItem("userId");
  return (
    <div>
      <RendeBaseOnPets userId={userId} pets={pets} />
    </div>
  );
}

export default PetList;