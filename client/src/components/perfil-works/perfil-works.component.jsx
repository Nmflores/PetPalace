import WorkListItem from "../perfil-works-item/perfil-works-item.component"
import './perfil-works.styles.css'
import { useState } from 'react'
import Axios from 'axios'
import Select from 'react-select'
import AlertDismissible from "../alerts/alert-dismissable.component"
import AddServiceModal from "../modals/adicionar-servico.modal"
import './perfil-works.styles.css'

import { ListGroup, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';

const WorksList = ({ works }) => {
    console.log("works 3:", works)
    const userId = '4ac85347-72f7-48e5-a469-eac17735e0c4';

    return (
        <div>
            <hr />
            <div className="createdServicesHeader">
                <h2>Serviços Criados</h2>
                <AddServiceModal userId={userId} />
            </div>            
            <div className='servicesList'>
                {works !== undefined ?
                    <ListGroup ListGroup key={works.serviceId}>
                        {works.map((work) => {
                            return <WorkListItem key={work.serviceId} work={work} />
                        })}
                    </ListGroup> : "Nenhum serviço Disponivel"}
            </div>
            <hr />
        </div >
    )
}

export default WorksList