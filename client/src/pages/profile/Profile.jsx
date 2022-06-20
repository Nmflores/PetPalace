import {React, useState} from 'react';
import { CardList, ProfilePicture } from '../../components';
import PetList from '../../components/pet-list/PetList';
import './profile.css';

const Profile = () => {

  const [cards, setCards] = useState([
    {
      id: "1",
      name: "Bruno Martins",
      title: "Passeio",
      price: 25.00,
      fone: "(51) 998652312",
      status: 1,
      petTypes: [
        {
          petType: "C",
        },
        {
          petType: "F",
        },
      ]
    },
    {
      id: "2",
      name: "Bruno Aguiar",
      title: "Hospedagem",
      price: 50.00,
      fone: "(51) 998652312",
      status: 1,
      petTypes: [
        {
          petType: "C",
        },
      ]
    },
    {
      id: "3",
      name: "Bruno Aguiar",
      title: "Hospedagem",
      price: 50.00,
      fone: "(51) 998652312",
      status: 1,
      petTypes: [
        {
          petType: "F",
        },
      ]
    },
  ]);

  const [pets] = useState([
    {
      name: "Helen",
      type: "F"
    },
    {
      name: "Claudio",
      type: "C"
    }
  ]);

  return (
    <div>
      <h1>Nome Usuário</h1>
      <div className='profilePicture'>
        <ProfilePicture />
      </div>
      <div className='petList'>
        <PetList pets={pets} />
      </div>      
      <h2>Serviços contratados</h2>
      <CardList cards={cards}/>
    </div>
  );
}
 
export default Profile;