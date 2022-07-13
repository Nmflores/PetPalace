import Axios from 'axios'
import { useState, useEffect } from 'react'
import React from 'react'
import { ListGroup, Card, Button } from 'react-bootstrap';
import DeleteRequiredContract from '../modals/excluir-servico-prestado';
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

function RenderBasedOnWorkerId({ contract, callbackRequiredContractDelete }) {
  const { queueId, ownerId, serviceId, price, status, entryDate, endDate, serviceName, workerName, workerContactNumber } = contract
  const userId = localStorage.getItem("userId")
  if (typeof (contract) !== 'undefined') {
    if (ownerId === userId) {
      return (
        <Card className="ContractItem" style={{ width: '18rem' }} id={queueId}>
          <DeleteRequiredContract
            serviceName={serviceName}
            queueId={queueId}
            callbackRequiredContractDelete={callbackRequiredContractDelete}
          />
          <Card.Body>
            <Card.Title className="serviceRequested mt-2 mb-3"><h3>{titleize(serviceName)}</h3></Card.Title>
            <Card.Text>
              <div className="detailsContainerRequired" id={queueId}>
                <div>
                  <ListGroup>
                    <ListGroup.Item><p className="clientNameRequired">Prestador: {workerName}</p></ListGroup.Item>
                    <ListGroup.Item><p className="clientNumberRequired">Contato: {workerContactNumber}</p></ListGroup.Item>
                    <ListGroup.Item><p className="priceRequired">R$ {price}</p></ListGroup.Item>
                  </ListGroup>
                </div>

                <div className="priceStatusRequired">

                  {/* <ReturnOnStatus className="statusRequired" contract={contract} /> */}
                </div>

              </div>
            </Card.Text>

          </Card.Body>
        </Card>
      )
    }
  } else {
    return (<p>Nenhum contrato</p>)
  }
}

const RequiredContractItem = ({ contract, callbackRequiredContractDelete }) => {

  return (

    <div className="itemContainer">
      <RenderBasedOnWorkerId contract={contract} callbackRequiredContractDelete={callbackRequiredContractDelete} />
    </div>
  )
}

export default RequiredContractItem;



