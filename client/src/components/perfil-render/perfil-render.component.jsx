import './perfil-render.styles.css'
import { useState, useEffect } from "react";
import PetsList from '../pets-list/pets-list.component';
import WorksList from '../works-list/works-list.component';
import Axios from 'axios'

const PerfilRender = ({ user }) => {
  const { userId, firstName, secondName } = user;
  const [pets, setPets] = useState([]);
  const [works, setWorks] = useState([]);
  const [urlUserId] = useState(encodeURIComponent(userId));


  useEffect(() => {
    Axios.get(`http://localhost:8080/api/v1/users/pets/${urlUserId}`)
      .then((pets) => {
        if (pets.data.length > 0) {
          console.log("pets:", pets.data);
          setPets(pets.data)
        }
      })
      Axios.get(`http://localhost:8080/api/v1/users/works/${urlUserId}`)
      .then((works) => {
        if (works.data.length > 0) {
          console.log("works:", works.data);
          setWorks(works.data)
        }
      })
  }, [])




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