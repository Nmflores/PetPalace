import Axios from 'axios'
import { useState, useEffect } from 'react'
import React from 'react'


import { ListGroup, Card, Button } from 'react-bootstrap';
import './requested-contract.css'
import AceitarContratoModal from '../modals/aceitar-contrato-modal'
import DeleteRequiredContract from '../modals/excluir-servico-prestado';

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

function ReturnOnStatus({ contract, callbackContractAccepted }) {
  const { status, endDate, serviceName, queueId } = contract
  if (status === 0) {
    return <div className='buttonsStatusZero'>
      <div className='acceptButton'>
        <AceitarContratoModal
          serviceName={serviceName}
          queueId={queueId}
          callbackContractAccepted={callbackContractAccepted}
        />
      </div>
      <Button
        className='rejectButton'
        serviceName={serviceName}
      >Negar Serviço
            </Button>
    </div>
  } else if (status === 1) {
    return <div><Button
      className='concludeButton'
      serviceName={serviceName}
    >Concluir Serviço</Button></div>
  } else if (status === 2) {
    const d = new Date(endDate);
    let onlyEndDate = d.getDay() + "/" + d.getMonth() + "/" + d.getFullYear()
    return <div>Data de termino: {onlyEndDate}</div>
  } else if (status === 3) {
    return <div>Serviço Negado</div>
  }
}

function ReturnBasedOnOwnerId({ contract, callbackContractAccepted, callbackRequiredContractDelete }) {
  const { queueId, workerId, ownerId, serviceId, price, status, entryDate, endDate, serviceName, workerName, ownerName, ownerContactNumber } = contract
  const userId = localStorage.getItem("userId")
  if (typeof (contract) !== 'undefined') {
    if (workerId === userId) {
      return (
        <Card className="ContractItem" style={{ width: '18rem' }} id={queueId}>
          <DeleteRequiredContract
            serviceName={serviceName}
            queueId={queueId}
            callbackRequiredContractDelete={callbackRequiredContractDelete}
          />
          <Card.Body>
            <Card.Title className="serviceRequested mt-2 mb-4"><h3>{titleize(serviceName)}</h3></Card.Title>
            <Card.Text>
              <div className="detailsContainerRequested" id={queueId}>
                <div>
                <ListGroup>
                <ListGroup.Item><p className="clientNameRequested">Cliente: {ownerName}</p> </ListGroup.Item>
                <ListGroup.Item><p className="clientNumberRequested">Contato: {ownerContactNumber}</p> </ListGroup.Item>
                <ListGroup.Item><p className="">R$ {price}</p> </ListGroup.Item>
               </ListGroup>
                </div>
                <div>

                  {/* <p className="statusRequested">Status: {statusShow(status)}</p>                     */}
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

const RequestedContractItem = ({ contract, callbackContractAccepted, callbackRequiredContractDelete }) => {
  return (
    <div>
      <ReturnBasedOnOwnerId
        contract={contract}
        callbackContractAccepted={callbackContractAccepted}
        callbackRequiredContractDelete={callbackRequiredContractDelete}
      />
    </div>
  )
}

export default RequestedContractItem;


