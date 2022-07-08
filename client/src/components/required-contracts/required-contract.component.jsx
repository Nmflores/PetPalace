import Axios from 'axios'
import { useState, useEffect } from 'react'
import React from 'react'


import { ListGroup, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import './required-contract.css'


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


function ReturnOnStatus({ contract }) {
  const { status, endDate } = contract
  if (status === 0) {
    return <div>Status: Serviço na fila</div>
  } else if (status === 1) {
    return <div><Button>Serviço em andamento</Button></div>
  } else if (status === 2) {
    const d = new Date(endDate);
    let onlyEndDate = d.getDay() + "/" + d.getMonth() + "/" + d.getFullYear()
    return <div><div>Status: Concluido</div><div>Data de termino: {onlyEndDate}</div></div>
  } else if (status === 3) {
    return <div>Status: Serviço Negado</div>
  }
}

function RenderBasedOnWorkerId({contract}) {
  const { queueId, workerId, ownerId, serviceId, price, status, entryDate, endDate, serviceName, workerName } = contract
  const userId = localStorage.getItem("userId")

  if (ownerId === userId) {
    console.log("required, contract", contract)
    return (<ListGroup.Item key={serviceId} className='itemContainerRequired'>
      <div className="detailsContainerRequired" id={queueId}>
        <div>
          <p className="serviceRequired">{titleize(serviceName)}</p>
          <p className="clientNameRequired">Nome do Prestador: {workerName}</p>
        </div>               
        <div className="priceStatusRequired">
          <p className="priceRequired">R$ {price}</p>
          <ReturnOnStatus className="statusRequired" contract={contract} />
        </div>               
      </div>
      <div className="buttonsContainer">

      </div>
    </ListGroup.Item>)
  }
}

const RequiredContractItem = ({ contract }) => {

  return (

    <div className="itemContainer">
      <RenderBasedOnWorkerId contract={contract}/> 
    </div>
  )
}

export default RequiredContractItem;