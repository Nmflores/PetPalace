import React from 'react'
import RequestedContractItem from "../profile-contracts-item/requested-contract.component"
import RequiredContractItem from "../profile-contracts-item/required-contract.component"




const ContractsList = ({ contracts }) => {
    const userId = localStorage.getItem("userId")

    return (
        <div className="worksList">
            <div className="createdServicesHeader">
                <h2>Contratos na Fila</h2>
                <hr />
                <div className='servicesList'>
                    {contracts.map((contract) => {
                        if(contract.workerId === userId){
                            return <RequestedContractItem  contract={contract} />
                        }
                    })}
                </div>
            </div>
            <div className="createdServicesHeader">
                <h2>Contratos Requeridos</h2>
                <hr />
                <div className='servicesList'>
                    {contracts.map((contract) => {
                        if(contract.ownerId === userId){
                            return <RequiredContractItem  contract={contract} />
                        }
                    })}
                </div>
            </div>
        </div >
    )
}

export default ContractsList