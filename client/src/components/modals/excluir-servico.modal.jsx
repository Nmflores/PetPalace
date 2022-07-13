import Axios from 'axios'
import {useState, useEffect} from 'react'
import React from 'react'
import './excluir-servico-modal.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { Button, Modal, } from 'react-bootstrap';
import AutoAlert from '../alerts/auto-alert'
import { useRef } from 'react';


function DisplayAlert({ text }) {
  if (text.includes('deletar')) {
      return <AutoAlert text={text} type="danger" />
  } else {
      return <AutoAlert text={text} type="success" />
  }
}

const DeleteServiceModal = ({serviceName, serviceId, callbackWorkDelete}) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Clique para excluir Serviço
    </Tooltip>
  )
    const [message, setMessage] = useState("")

    const [show, setShow] = useState(false);

    const isDeleted = useRef(false)
  
    const handleClose = () => setShow(false);
    const handleShow = () => {
      setShow(true) 
      setMessage("")
    }

 


    const deleteService = async (e) => {
        e.preventDefault()
        isDeleted.current = true             
        const userId = localStorage.getItem("userId")
        const serviceId = parseInt(e.target.id)
        Axios.delete(`http://localhost:8080/api/v1/workers`,{
        data:{
            userId,
            serviceId
        }}
        ).then((response) => {
            console.log(response.data)
            setMessage(response.data.data)            
        }).catch((err) => {
          console.log(err.response.data)
          setMessage(err.response.data.data)
        })
        setTimeout(() => {callbackWorkDelete(isDeleted.current)}, 2000)   
    }

    return (
      <>
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
       <div className="deleteButtonContainer">
       <Button variant="none" className="deleteButton" onClick={handleShow}>
          &#10006;
        </Button>
       </div>
      </OverlayTrigger>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Excluir Serviço</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DisplayAlert text={message}/>
          <p>Você tem certeza que deseja excluir o serviço {serviceName}?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="btn btn-danger" 
            type="submit" 
            onClick={(e)=>{
                deleteService(e)
            }}
            id={serviceId}>
              Excluir Serviço
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

export default DeleteServiceModal