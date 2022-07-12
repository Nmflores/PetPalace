import WorkListItem from "../perfil-works-item/perfil-works-item.component"
import React from 'react'
import AddServiceModal from "../modals/adicionar-servico.modal"

import { ListGroup, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import './perfil-works.styles.css'

function RenderBasedOnWorks({ works, callbackPrice, callbackWorkDelete, callbackWorkAdded }) {
    if (works.length === 0) {
        return (
            <div>
                <div className="createdServicesHeader">
                    <h2>Serviços Criados</h2>
                    <AddServiceModal callbackWorkAdded={callbackWorkAdded} />
                    <hr />
                </div>
                <div className='servicesList'>
                    Nenhum serviço Disponivel
                </div>
            </div >
        )
    } else {
        return (
            <div>
                <div className="createdServicesHeader">
                    <h2>Serviços Criados</h2>
                    <AddServiceModal callbackWorkAdded={callbackWorkAdded} />
                </div>
                <hr />
                <div>
                    <ListGroup className='worksListContainer'>
                        {works.map((work) => {
                            return <WorkListItem 
                                        callbackPrice={callbackPrice} 
                                        callbackWorkDelete={callbackWorkDelete}
                                        key={work.serviceId} 
                                        work={work} 
                                    />
                        })}
                    </ListGroup>
                </div>
            </div >
        )

    }
}

function WorksList ({ works, callbackPrice, callbackWorkDelete, callbackWorkAdded }){    

    return (
        <div>
            <RenderBasedOnWorks 
                callbackPrice={callbackPrice} 
                callbackWorkDelete={callbackWorkDelete} 
                callbackWorkAdded={callbackWorkAdded}
                works={works} 
            />
        </div >
    )
}

export default WorksList