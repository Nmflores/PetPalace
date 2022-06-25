import "./perfil-works-item.styles.css"
import Axios from 'axios'
import {useState} from 'react'
import AlertDismissible from "../alerts/alert-dismissable.component"
import DeleteServiceModal from '../modals/excluir-servico.modal'
import EditPriceModal from '../modals/editar-servico.modal'

import { ListGroup, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';

import './editPriceModal.styles.css';


const WorkListItem = ({ work }) => {
    // GET FROM LOCALSTORAGE
    const userId = '4ac85347-72f7-48e5-a469-eac17735e0c4';
    const { serviceName, serviceId, price } = work

    return (
       <div>
         <ListGroup.Item key={serviceId}>
            <p>{serviceName}</p>
            <p>R${price}</p>
            <DeleteServiceModal userId={userId} serviceId={serviceId} serviceName={serviceName}/>
            <EditPriceModal userId={userId} serviceId={serviceId} price={price}/>
        </ListGroup.Item>
       </div>
    )
}

export default WorkListItem;