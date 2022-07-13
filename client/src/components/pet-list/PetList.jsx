import React from 'react';
import Pet from '../pet/Pet';
import './petList.css';
import AddPetModal from '../modals/adicionar-pet.modal'

function RendeBaseOnPets({ userId, pets, callbackPetAdded, callbackPetDeleted }) {
  if (typeof(pets) !== 'undefined') {
    return (
      <div>
        <div className='petListHeader'>
        <div classaName="petsListTitleConteiner">
          <h3>Lista de Pets</h3>
          </div>
          <div className="petListButtonContainer">
          <AddPetModal userId={userId} callbackPetAdded={callbackPetAdded} />
          </div>
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
        <div classaName="petsListTitleConteiner">
          <h3>Lista de Pets</h3>
          </div>
          <div className="petListButtonContainer">
          <AddPetModal userId={userId} callbackPetAdded={callbackPetAdded} />
          </div>
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


