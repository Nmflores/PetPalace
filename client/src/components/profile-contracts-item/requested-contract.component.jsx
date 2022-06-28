import Axios from 'axios'
import {useState, useEffect} from 'react'
import AlertDismissible from "../alerts/alert-dismissable.component"
import DeleteServiceModal from '../modals/excluir-servico.modal'
import EditPriceModal from '../modals/editar-servico.modal'

import { ListGroup, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';



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

  const statusShow = (status) => {
    let statusOptions = ["Na fila", "Aceito", "Concluido", "Negado"]
    return statusOptions[status]
  }

  function ReturnOnStatus({contract}){
    const {status, endDate} = contract
    if(status === 0){
      return <div><Button>Aceitar Serviço</Button><Button>Negar Serviço</Button></div>
    }else if(status === 1){
      return <div><Button>Concluir Serviço</Button></div>
    }else if(status === 2){
      const d = new Date( endDate );
      let onlyEndDate = d.getDay() + "/" + d.getMonth() + "/" + d.getFullYear()
      return <div>Data de termino: {onlyEndDate}</div>
    }else if(status === 3){
      return <div>Serviço Negado</div>
    }
  }

const RequestedContractItem = ({ contract }) => {
    // GET FROM LOCALSTORAGE
    const userId = localStorage.getItem("userId");;
    const { queueId, workerId, ownerId, serviceId, price, status } = contract
    const servicesArray = ["Passeio", "Pet Sitting", "Hospedagem", "Banho", "Lar Provisorio"]
    const serviceName = servicesArray[serviceId]
    const [ownerFullName, setOwnerFullName] = useState("")


    useEffect(()=>{
        Axios.get(`http://localhost:8080/api/v1/users/${ownerId}`)
        .then((user) => {
          let firstName = titleize(user.data.data[0].firstName)
          let secondName = titleize(user.data.data[0].secondName)
          let fullName = `${firstName} ${secondName}`
          setOwnerFullName(fullName)
        })
    })

    return (
       <div className="itemContainer">
         {workerId === userId &&
         <ListGroup.Item key={serviceId}>
         <div className="detailsContainer" id={queueId}>
             <p className="service">{serviceName}</p>
             <p className="clientName">Nome do Cliente: {ownerFullName}</p>
             <p className="price">R$ {price}</p>
             <p>Status: {statusShow(status)}</p>

             <ReturnOnStatus contract={contract}/>
         </div>            
         <div className="buttonsContainer">
         
         </div>            
     </ListGroup.Item> 
      } 
       </div>
    )
}

export default RequestedContractItem;