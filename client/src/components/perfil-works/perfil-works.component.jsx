import WorkListItem from "../perfil-works-item/perfil-works-item.component"
import './perfil-works.styles.css'
import React from 'react'
import AddServiceModal from "../modals/adicionar-servico.modal"

import { ListGroup, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';

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
                <div className='mt-4'>
                    <ListGroup>
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