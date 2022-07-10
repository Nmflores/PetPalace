import React from 'react'
import RequestedContractItem from "../profile-contracts-item/requested-contract.component"
import RequiredContractItem from "../required-contracts/required-contract.component"




const ContractsList = ({ contracts, callbackContractAccepted, callbackRequiredContractDelete }) => {
    const userId = localStorage.getItem("userId")

    return (
        <div className="worksList">
            <div className="createdServicesHeader">
                <h2>Contratos na Fila</h2>
                <hr />
                <div className='servicesList'>
                    {contracts.map((contract) => {
                        if(contract.workerId === userId){
                            return <RequestedContractItem 
                                        contract={contract} 
                                        callbackContractAccepted={callbackContractAccepted}
                                        callbackRequiredContractDelete={callbackRequiredContractDelete}
                                    />
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
                            return <RequiredContractItem  
                                    contract={contract} 
                                    callbackRequiredContractDelete={callbackRequiredContractDelete}
                                    />
                        }
                    })}
                </div>
            </div>
        </div >
    )
}

export default ContractsList