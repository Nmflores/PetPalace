import { useState } from 'react'
import React from 'react'
import Axios from 'axios'
import Select from 'react-select'
import AlertDismissible from "../alerts/alert-dismissable.component"
import RequestedContractItem from "../profile-contracts-item/requested-contract.component"
import RequiredContractItem from "../profile-contracts-item/required-contract.component"
import { ListGroup, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';

function RenderContractListBaseOnLength({contracts}) {
    const userId = localStorage.getItem("userId")
    if (contracts.length > 0) {
        contracts.forEach((contract) => {
            if (contract.workerId === userId) {
                return (
                    <div className="createdServicesHeader">
                        <h2>Contratos na Fila</h2>
                        <hr />
                        <div className='servicesList'>
                            <RequiredContractItem key={contract.serviceId} contract={contract} />
                        </div>
                    </div>
                )

            } else if (contract.ownerId === userId) {
                return (
                    <div className="createdServicesHeader">
                        <h2>Contratos Requisitados</h2>
                        <hr />
                        <div className='servicesList'>
                            <RequiredContractItem key={contract.serviceId} contract={contract} />
                        </div>
                    </div>
                )
            }
        })
    } else {
        return (
            <div>
                <div className="createdServicesHeader">
                    <h2>Contratos Na fila</h2>
                    <hr />
                    <div className='servicesList'>
                        Nenhum contrato listado
                    </div>
                </div>

                <div className="createdServicesHeader">
                    <h2>Contratos Requisitados</h2>
                    <hr />
                    <div className='servicesList'>
                        Nenhum contrato listado
                </div>
                </div>
            </div>
        )
    }
}

const ContractsList = ({ contracts }) => {
console.log("test:",contracts)
    return (
        <div>
            <RenderContractListBaseOnLength contracts={contracts} />
        </div >
    )
}

export default ContractsList