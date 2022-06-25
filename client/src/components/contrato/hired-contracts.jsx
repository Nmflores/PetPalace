import { React, useEffect, useState } from 'react';
import Axios from 'axios'
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

function returnServiceName(serviceId) {
  const services = [
    "Passeio",
    "Pet Sitting",
    "Hospedagem",
    "Banho",
    "Lar Provisorio"
  ]
  return services[serviceId];
}



const HiredContract = ({ contract }) => {
  const userId = '4ac85347-72f7-48e5-a469-eac17735e0c4';
  const { queue_id, service_id, worker_id, owner_id, price, status } = contract
  const [workerFullName, setWorkerFullName] = useState("")
  const [workerPhone, setWorkerPhone] = useState("")
  const [ownerFullName, setOwnerFullName] = useState("")
  const [ownerPhone, setOwnerPhone] = useState("")


  useEffect(() => {
    const fechApi = async () => {
      Axios.get(`http://localhost:8080/api/v1/users/${worker_id}`)
        .then((user) => {
          let firstName = titleize(user.data.data[0].firstName)
          let secondName = titleize(user.data.data[0].secondName)
          let fullName = `${firstName} ${secondName}`
          let phoneNbr = user.data.data[0].contactNbr
          setWorkerFullName(fullName)
          setWorkerPhone(phoneNbr)

        })
      Axios.get(`http://localhost:8080/api/v1/users/${owner_id}`)
        .then((user) => {
          let firstName = titleize(user.data.data[0].firstName)
          let secondName = titleize(user.data.data[0].secondName)
          let fullName = `${firstName} ${secondName}`
          let phoneNbr = user.data.data[0].contactNbr
          setOwnerFullName(fullName)
          setOwnerPhone(phoneNbr)
        })
    }
    fechApi()

  }, [])


  return (
    <div className='contractsList'>
      {userId === owner_id &&
        <div>
          <p>Serviço Contratado: {titleize(returnServiceName(service_id))}</p>
          <p>R${price}</p>
          <p>Nome Prestador: {workerFullName}</p>
          <p>Contato: {workerPhone}</p>
          </div>
      }
    </div>
  )
}

export default HiredContract;

