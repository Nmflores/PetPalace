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

function RenderBasedOnWorks({ works, userId }) {
    console.log(works)
    if (works.length === 0) {
        return (
            <div>
                <hr />
                <div className="createdServicesHeader">
                    <h2>Serviços Criados</h2>
                    <AddServiceModal userId={userId} />
                </div>
                <div className='servicesList'>
                    Nenhum serviço Disponivel
                </div>
            </div >
        )
    } else {
        return (
            <div>
                <hr />
                <div className="createdServicesHeader">
                    <h2>Serviços Criados</h2>
                    <AddServiceModal userId={userId} />
                </div>
                <div className='servicesList'>
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
    const userId = '4ac85347-72f7-48e5-a469-eac17735e0c4';

    return (
        <div>
            <RenderBasedOnWorks works={works} userId={userId} />
        </div >
    )
}

export default WorksList