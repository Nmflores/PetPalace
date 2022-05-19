import './perfil-render.styles.css'
import { useState, useEffect } from "react";
import PetsList from '../pets-list/pets-list.component';
import WorksList from '../works-list/works-list.component';

const PerfilRender = ({ user }) => {
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
    <div key={userId} className='perfil-render-container'>
      <h2>{firstName} {secondName}</h2>
      <hr></hr>
      <PetsList pets={pets} />
      <WorksList works={works} />
    </div>
  )
}

export default PerfilRender;