import React from 'react'
import RequestedContractItem from "../profile-contracts-item/requested-contract.component"
import RequiredContractItem from "../required-contracts/required-contract.component"
import './profile-contracts.styles.css'



function ContractsList({ contracts, callbackContractAccepted, callbackRequiredContractDelete }) {
    const userId = localStorage.getItem("userId")
    if (typeof (contracts) !== 'undefined') {
        return (
            <>
            <div className="contractsContainer mb-5">
                <div className="createdContractsHeader">
                    <h3>Contratos na Fila</h3>
                    <hr />
                </div>
                <div className='contractsList'>
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
      

            <div className="contractsContainer mt-5">
                <div className="createdContractsHeader">
                    <h3>Contratos Requeridos</h3>
                    <hr />
                </div>
                    <div className='contractsList'>
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
            </>
        )
    } else {
        return (
           <>
            <div className="contractsContainer">
                <div className="createdContractsHeader">
                    <h3>Contratos na Fila</h3>
                    <hr />
                    <div className='contractsList'>
                        <p>Nenhum contrato</p>
                    </div>
                </div>
                </div>

                <div className="contractsContainer mt-5">
                <div className="createdContractsHeader">
                    <h3>Contratos Requeridos</h3>
                    <hr />
                    <div className='contractsList'>
                        <p>Nenhum contrato</p>
                    </div>
                </div>
            </div >
           </>
        )
    }

}

export default ContractsList