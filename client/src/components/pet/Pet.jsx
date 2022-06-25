import React from 'react';
import iconCat from '../../assets/cat-icon.png';
import iconDog from '../../assets/dog-icon.png';
import './pet.css';
import DeletePetModal from '../modals/excluir-pet.modal'



function titleize(text) {
  var loweredText = text.toLowerCase();
  var words = loweredText.split(" ");
  for (var a = 0; a < words.length; a++) {
      var w = words[a];

      var firstLetter = w[0];
      w = firstLetter.toUpperCase() + w.slice(1);

      words[a] = w;
  }
  return words.join(" ");
}

const Pet = ({pet}) => {
  let petIcon = pet.petType===1  ? iconCat : iconDog

  return (
    <div className='petList'>
      <p>{titleize(pet.petName)}</p>
      <img 
        className='petIcon'
        src={petIcon} 
        alt="Pet icon" 
      />
      <p>{titleize(pet.petType)}</p>
      <p>{titleize(pet.petBreed)}</p>
      <DeletePetModal pet={pet} />
    </div>      
  );
}
 
export default Pet;