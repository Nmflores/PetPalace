import { useState } from 'react'
import Axios from 'axios'
import Select from 'react-select'
import AlertDismissible from "../alerts/alert-dismissable.component"
import RequestedContractItem from "../profile-contracts-item/requested-contract.component"
import RequiredContractItem from "../profile-contracts-item/required-contract.component"


import { ListGroup, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';

const ContractsList = ({ contracts }) => {
    console.log("contracts 3:", contracts)
    const userId = '4ac85347-72f7-48e5-a469-eac17735e0c4';

    return (
        <div>
            <hr />
            <div className="createdServicesHeader">
                <h2>Contratos na Fila</h2>
            <div className='servicesList'>
                {contracts !== undefined ?
                    <ListGroup>
                        {contracts.map((contract) => {
                            return <RequestedContractItem key={contract.serviceId} contract={contract} />
                        })}
                    </ListGroup> : "Nenhum contrato na fila"}
            </div>
            </div>
            <div className="createdServicesHeader">
                <h2>Contratos Requisitados</h2>
            <div className='servicesList'>
                {contracts !== undefined ?
                    <ListGroup>
                        {contracts.map((contract) => {
                            return <RequiredContractItem key={contract.serviceId} contract={contract} />
                        })}
                    </ListGroup> : "Nenhum contrato requisitado"}
            </div>
            </div>
            <hr />
        </div >
    )
}

export default ContractsList