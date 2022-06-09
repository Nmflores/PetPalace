import React, {useState} from 'react';
import {Header, CardList,Filter } from '../../components'


const Home = () => {

  const [isExpanded, setExpanded] = React.useState(true);

  const [cards, setCards] = useState([
    {
      id: "1",
      name: "Bruno Martins",
      title: "Passeio",
      price: 25.00,
      petTypes: [
        {
          petType: "canino",
        },
        {
          petType: "felino",
        },
      ]
    },
    {
      id: "2",
      name: "Bruno Aguiar",
      title: "Hospedagem",
      price: 50.00,
      petTypes: [
        {
          petType: "canino",
        },
      ]
    },
    {
      id: "3",
      name: "Bruno Aguiar",
      title: "Hospedagem",
      price: 50.00,
      petTypes: [
        {
          petType: "felino",
        },
      ]
    },
  ]);

  return <div>
   <Header />
   <Filter />
   <CardList cards={cards} isActive={isExpanded} />
  </div>;
};

export default Home;
