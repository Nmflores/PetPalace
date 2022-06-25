import {React, useState, useEffect} from 'react';
import {ProfilePicture } from '../../components';
import PetList from '../../components/pet-list/PetList';
import ContractsList from '../../components/contracts-list/contracts-list.component';

import WorksList from '../../components/perfil-works/perfil-works.component';
import './profile.css';
import Axios from 'axios'


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


const Profile = () => {
  // GET FROM LOCALSTORAGE
  const userId = '4ac85347-72f7-48e5-a469-eac17735e0c4';
  const [fullName , setFullName] = useState("")
  const [pets, setPets] = useState([])
  const [works, setWorks] = useState([])
  const [contracts, setContracts] = useState([])
  


  useEffect(() => { 
    const fechApi = async () => {
      Axios.get(`http://localhost:8080/api/v1/users/pets/${userId}`)
      .then((pets) => {
        console.log("pets 1: ",pets)
          setPets(pets.data.data)
      })
    
    Axios.get(`http://localhost:8080/api/v1/users/workers/${userId}`)
      .then((works) => {
        console.log("works 1: ",works.data)
            setWorks(works.data.data)
      })
    
      Axios.get(`http://localhost:8080/api/v1/contracts/${userId}`)
      .then((contracts) => {
        setContracts(contracts.data.data)
      })
    
    Axios.get(`http://localhost:8080/api/v1/users/${userId}`)
      .then((user) => {
        let firstName = titleize(user.data.data[0].firstName)
        let secondName = titleize(user.data.data[0].secondName)
        let fullName = `${firstName} ${secondName}`
        setFullName(fullName)
      })
    }
  

    fechApi()
    {/*const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
      fechApi()
      }, 9000)

    return () => clearInterval(intervalId); //This is important*/}

  }, [])


  return (
    <div>
      <h1>{fullName}</h1>
      <div className='profilePicture'>
        <ProfilePicture />
      </div>
  <div className='petList'>
        <PetList pets={pets} />
        </div>     
  <div className='worksList'>
  <WorksList works={works}/>
  </div>
  <div className='contractsList'>
  <ContractsList contracts={contracts}/>
  </div>
    </div>
  );
}
 
export default Profile;