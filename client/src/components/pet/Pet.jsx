import React from 'react';
import iconCat from '../../assets/cat-icon.png';
import iconDog from '../../assets/dog-icon.png';
import './pet.css';
import DeletePetModal from '../modals/excluir-pet.modal'
import { ListGroup, Card, Button } from 'react-bootstrap';




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

const Pet = ({pet, callbackPetDeleted}) => {
  return (
    <Card className="petItem" style={{ width: '15rem' }}>
      <DeletePetModal pet={pet} callbackPetDeleted={callbackPetDeleted} />
      <Card.Img className="petIcon" variant="top" src={pet.petType === 'caninos'  ? iconDog : iconCat} />
      <Card.Body>
        <Card.Title className="mt-2 mb-3"><h4>{titleize(pet.petName)}</h4></Card.Title>
        <ListGroup>
        <ListGroup.Item>Especie: {titleize(pet.petType)}</ListGroup.Item>
        <ListGroup.Item>Raça: {pet.petBreed}</ListGroup.Item>
        </ListGroup>
      
      </Card.Body>
    </Card>
  )
}
 
export default Pet;


