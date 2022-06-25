import React from 'react';
import Contract from '../contrato/contrato';
import AddPetModal from '../modals/adicionar-pet.modal'
import { ListGroup } from "react-bootstrap";



const ContractsList = ({ contracts }) => {
  let conter = 0;

  console.log(`contracts in cList ${contracts}`)
  const userId = '4ac85347-72f7-48e5-a469-eac17735e0c4';
  return (
    <div>
      <h3>Contratos</h3>
      <hr></hr>
      <div className='contractsList'>

        {contracts !== undefined || contracts.length > 0 ?
          <ListGroup ListGroup key={conter}>
            {contracts.map((contract) => {
              conter++
              return <Contract key={contract.queueId} contract={contract} />
            })}
          </ListGroup> : "Nenhum Contrato Disponivel"}

      </div>
    </div>
  );
}

export default ContractsList;