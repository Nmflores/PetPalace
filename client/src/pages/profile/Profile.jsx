import { useState, useEffect } from 'react'
import React from 'react'
import { ProfilePicture } from '../../components'
import PetList from '../../components/pet-list/PetList'
import WorksList from '../../components/perfil-works/perfil-works.component'
import ContractsList from '../../components/profile-contracts-list/profile-contracts.component'
import Axios from 'axios'
import './profile.css';


function titleize(text) {
  var loweredText = text.toLowerCase();
  var words = loweredText.split(" ");
  for (var a = 0; a < words.length; a++) {
    var w = words[a];

    var firstLetter = w[0];
    w = firstLetter.toUpperCase() + w.slice(1)

    words[a] = w;
  }
  return words.join(" ");
}

function ReturnBasedOnUserId({ 
                              userId, 
                              fullName, 
                              pets, 
                              works, 
                              contracts, 
                              callbackPrice, 
                              callbackWorkDelete, 
                              callbackWorkAdded, 
                              callbackPetAdded,
                              callbackPetDeleted,
                              callbackContractAccepted
                            }) 
{

  if (userId !== "") {
    return (
      <div>
        <h1>{fullName}</h1>
        <div className='profilePicture'>
          <ProfilePicture />
        </div>
        <div className='petList'>
          <PetList 
            pets={pets} 
            callbackPetAdded={callbackPetAdded} 
            callbackPetDeleted={callbackPetDeleted}
          />
        </div>
        <div className='worksListContainer'>
          <WorksList 
            works={works} 
            callbackPrice={callbackPrice}
            callbackWorkDelete={callbackWorkDelete} 
            callbackWorkAdded={callbackWorkAdded}
          />
        </div>
        <div>
          <ContractsList contracts={contracts} callbackContractAccepted={callbackContractAccepted} />
        </div>
      </div>
    )
  } else {
    return ("Acesso Negado")
  }
}

const Profile = () => {
  // GET FROM LOCALSTORAGE
  const userId = localStorage.getItem("userId");
  const [fullName, setFullName] = useState("")
  const [pets, setPets] = useState([])
  const [works, setWorks] = useState([])
  const [contracts, setContracts] = useState([])
  const [isConfirmedPrice, setIsConfirmedPrice] = useState(false);
  const [isConfirmedWorkDelete, setIsConfirmedWorkDelete] = useState(false);
  const [isConfirmedWorkAdded, setIsConfirmedWorkAdded] = useState(false);
  const [isConfirmedPetAdded, setIsConfirmedPetAdded] = useState(false);
  const [isConfirmedPetDeleted, setIsConfirmedPetDeleted] = useState(false);
  const [isConfirmedAcceptedContract, setIsConfirmedAcceptedContract] = useState(false);
  

  useEffect(() => {
    const fechApi = async () => {
      Axios.get(`http://localhost:8080/api/v1/users/pets/${userId}`)
        .then((pets) => {
          if (pets.data.data.length > 0) {
            setPets(pets.data.data)
          } else {
            setPets([])
          }
        })
      Axios.get(`http://localhost:8080/api/v1/users/workers/${userId}`)
        .then((works) => {
          if (works.data.data.length > 0) {
            setWorks(works.data.data)
          } else {
            setWorks([])
          }
        })
      Axios.get(`http://localhost:8080/api/v1/users/${userId}`)
        .then((user) => {
          let firstName = titleize(user.data.data[0].firstName)
          let secondName = titleize(user.data.data[0].secondName)
          let fullName = `${firstName} ${secondName}`
          setFullName(fullName)
        })
      Axios.get(`http://localhost:8080/api/v1/contracts/${userId}`)
        .then((contracts) => {
          if (contracts.data.data.length > 0) {
            setContracts(contracts.data.data)
          } else {
            setContracts([])
          }
        })
    }

    fechApi()
    {/*const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
      fechApi()
      }, 9000)

    return () => clearInterval(intervalId); //This is important*/}

  }, [])

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/v1/users/workers/${userId}`)
        .then((works) => {
          if (works.data.data.length > 0) {
            setWorks(works.data.data)
            setIsConfirmedWorkDelete(false)
            setIsConfirmedPrice(false)
            setIsConfirmedWorkAdded(false)
          } else {
            setWorks([])
          }
        })
  },[isConfirmedPrice, isConfirmedWorkDelete, isConfirmedWorkAdded])

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/v1/users/pets/${userId}`)
        .then((pets) => {
          if (pets.data.data.length > 0) {
            setPets(pets.data.data)
            setIsConfirmedPetAdded(false)
            setIsConfirmedPetDeleted(false)
          } else {
            setPets([])
          }
        })
  },[isConfirmedPetAdded, isConfirmedPetDeleted])

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/v1/contracts/${userId}`)
        .then((contracts) => {
          if (contracts.data.data.length > 0) {
            setContracts(contracts.data.data)
            setIsConfirmedAcceptedContract(false)
          } else {
            setContracts([])
          }
        })
  },[isConfirmedAcceptedContract])

  const setIsConfirmedPriceOnProfile = (flag) => {
    console.log(flag)
    setIsConfirmedPrice(flag)    
  }

  const setIsConfirmedWorkDeleteOnProfile = (flag) => {
    console.log(flag)
    setIsConfirmedWorkDelete(flag)
  }

  const setIsConfirmedWorkAddedOnProfile = (flag) => {
    console.log(flag)
    setIsConfirmedWorkAdded(flag)
  }

  const setIsConfirmedPetAddedOnProfile = (flag) => {
    console.log(flag)
    setIsConfirmedPetAdded(flag)
  }

  const setIsConfirmedPetDeletedOnProfile = (flag) => {
    console.log(flag)
    setIsConfirmedPetDeleted(flag)
  }

  const setIsConfirmedAcceptedContractOnProfile = (flag) => {
    console.log(flag)
    setIsConfirmedAcceptedContract(flag)
  }

  return (
    <>
      <div>
          <ReturnBasedOnUserId 
            userId={userId} 
            fullName={fullName} 
            works={works} 
            pets={pets} 
            contracts={contracts} 
            callbackPrice={setIsConfirmedPriceOnProfile}
            callbackWorkDelete={setIsConfirmedWorkDeleteOnProfile}
            callbackWorkAdded={setIsConfirmedWorkAddedOnProfile}
            callbackPetAdded={setIsConfirmedPetAddedOnProfile}
            callbackPetDeleted={setIsConfirmedPetDeletedOnProfile}
            callbackContractAccepted={setIsConfirmedAcceptedContractOnProfile}
          />
      </div>      
    </>
  )
}

export default Profile;