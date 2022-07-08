import Axios from 'axios'
import { useState, useEffect } from 'react'
import React from 'react'


import { ListGroup, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import './requested-contract.css'


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
  let statusOptions = ["Na fila", "Em andamento", "Concluído", "Negado"]
  return statusOptions[status]
}

function ReturnOnStatus({ contract }) {
  const { status, endDate } = contract
  if (status === 0) {
    return <div><Button className='acceptButton'>Aceitar Serviço</Button>
                <Button className='rejectButton'>Negar Serviço</Button></div>
  } else if (status === 1) {
    return <div><Button className='concludeButton'>Concluir Serviço</Button></div>
  } else if (status === 2) {
    const d = new Date(endDate);
    let onlyEndDate = d.getDay() + "/" + d.getMonth() + "/" + d.getFullYear()
    return <div>Data de termino: {onlyEndDate}</div>
  } else if (status === 3) {
    return <div>Serviço Negado</div>
  }
}

function ReturnBasedOnOwnerId({ contract }) {
  const { queueId, workerId, ownerId, serviceId, price, status, entryDate, endDate, serviceName, workerName, ownerName } = contract
  const userId = localStorage.getItem("userId")
  if (workerId === userId) {
    return (
      <ListGroup.Item key={serviceId} className='itemContainerRequested'>
        <div className="detailsContainerRequested" id={queueId}>
          <div>
            <p className="serviceRequested">{titleize(serviceName)}</p>
            <p className="clientNameRequested">Nome do Cliente: {ownerName}</p>
          </div>          
          <div>
            <p className="priceRequested">R$ {price}</p>
            <p className="statusRequested">Status: {statusShow(status)}</p>                    
          </div>          
        </div>        
        <ReturnOnStatus contract={contract} />
      </ListGroup.Item>
      )
  }
}

const RequestedContractItem = ({ contract }) => {
  return (
    <div>
      <ReturnBasedOnOwnerId contract={contract} />
    </div>
  )
}

export default RequestedContractItem;