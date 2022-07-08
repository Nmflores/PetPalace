import WorkListItem from "../perfil-works-item/perfil-works-item.component"
import React from 'react'
import AddServiceModal from "../modals/adicionar-servico.modal"

import { ListGroup, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import './perfil-works.styles.css'

function RenderBasedOnWorks({ works }) {
    if (works.length === 0) {
        return (
            <div>
                <div className="createdServicesHeader">
                    <h2>Serviços Criados</h2>
                    <AddServiceModal  />
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
                    <AddServiceModal />
                </div>
                <hr />
                <div>
                    <ListGroup className='worksListContainer'>
                        {works.map((work) => {
                            return <WorkListItem key={work.serviceId} work={work} />
                        })}
                    </ListGroup>
                </div>
            </div >
        )

    }
}

const WorksList = ({ works }) => {
    return (
        <div>
            <RenderBasedOnWorks works={works} />
        </div >
    )
}

export default WorksList