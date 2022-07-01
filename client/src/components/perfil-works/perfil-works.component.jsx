import WorkListItem from "../perfil-works-item/perfil-works-item.component"
import './perfil-works.styles.css'
import { useState } from 'react'
import React from 'react'
import Axios from 'axios'
import Select from 'react-select'
import AlertDismissible from "../alerts/alert-dismissable.component"
import AddServiceModal from "../modals/adicionar-servico.modal"
import './perfil-works.styles.css'

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
                    <ListGroup ListGroup key={works.serviceId}>
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