import Axios from 'axios'
import {useState} from 'react'
import React from 'react'

import { ListGroup, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import AutoAlert from '../alerts/auto-alert'
import { useRef } from 'react';


const AceitarContratoModal = ({serviceName, queueId, callbackContractAccepted}) => {
    const [message, setMessage] = useState("")

    const [show, setShow] = useState(false);

    const isAccepted = useRef(false)
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const acceptService = async (e) => {
        e.preventDefault()
        isAccepted.current = true             
        Axios.put(`http://localhost:8080/api/v1/contracts/status`,{
        data:{
            queueId,
            status:1
        }}
        ).then((response) => {
            console.log(response.data)
            setMessage(response.data.data)            
        }).catch((err) => {
          console.log(err.response.data)
          setMessage(err.response.data.data)
        })
        callbackContractAccepted(isAccepted.current)
    }

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Aceitar Serviço
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Aceitar Serviço</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {message.length > 0 ? <AutoAlert text={message} type="success"/> : ""}            
          <p>Você tem certeza que deseja aceitar o serviço de {serviceName}?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" 
              type="submit" 
              onClick={(e)=>{
                acceptService(e)
              }}
            >
              Aceitar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

export default AceitarContratoModal