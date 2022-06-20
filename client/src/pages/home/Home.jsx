import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import {Header, CardList,Filter } from '../../components'

const Home = () => {

  const [cards, setCards] = useState([
    {
      id: "1",
      name: "Bruno Martins",
      title: "Passeio",
      price: 25.00,
      fone: "(51) 998652312",
      status: 0,
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
      status: 0,
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
      status: 0,
      petTypes: [
        {
          petType: "F",
        },
      ]
    },
  ]);

  return <div className='homeContainer'>
    <Link to="profile/1">tela_perfil</Link>
   <Header />
   <Filter />
   <CardList cards={cards}/>
  </div>;
};

export default Home;
