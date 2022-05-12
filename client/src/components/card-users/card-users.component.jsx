import './card-users.styles.css'
import { useState, useEffect } from "react";
import CardListPets from '../card-pets-list/card-pets-list.component';
import CardListWorks from '../card-works-list/card-works-list.component';

const CardUsers = ({ user }) => {
  const { userId, firstName, secondName } = user;
  const [pets, setPets] = useState([]);
  const [works, setWorks] = useState([]);
  const [urlUserId] = useState(encodeURIComponent(userId));


  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/users/pets/${urlUserId}`)
      .then((response) => response.json())
      .then((pets) => {
        if (pets.length > 0) {
          setPets(pets)
        }
      })
  }, []);


  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/users/works/${urlUserId}`)
      .then((response) => response.json())
      .then((works) => {
        if (works.length > 0) {
          setWorks(works)
        }
      })
  }, []);


  return (
    <div key={userId} className='card-container'>
      <h2>{firstName} {secondName}</h2>
      <p>{userId}</p>
      <CardListPets pets={pets} />
      <CardListWorks works={works} />
    </div>
  )
}

export default CardUsers;