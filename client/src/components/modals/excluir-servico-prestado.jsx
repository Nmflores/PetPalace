import Axios from 'axios'
import {useState} from 'react'
import React from 'react'

import { ListGroup, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import AutoAlert from '../alerts/auto-alert'
import { useRef } from 'react';


const DeleteRequiredContract = ({serviceName, queueId, callbackRequiredContractDelete}) => {
    const [message, setMessage] = useState("")

    const [show, setShow] = useState(false);

    const isDeleted = useRef(false)
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteService = async (e) => {
        e.preventDefault()
        isDeleted.current = true             
        Axios.delete(`http://localhost:8080/api/v1/contracts`,{
        data:{
          queueId
        }}
        ).then((response) => {
            console.log(response.data)
            setMessage(response.data.data)            
        }).catch((err) => {
          console.log(err.response.data)
          setMessage(err.response.data.data)
        })
        setTimeout(() => {callbackRequiredContractDelete(isDeleted.current)}, 2000)   
    }

    return (
      <>
        <Button variant="btn btn-primary" onClick={handleShow}>
          Excluir contrato
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Excluir contrato</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {message.length > 0 ? <AutoAlert text={message} type="success"/> : ""}            
          <p>Você tem certeza que deseja excluir o contrato {serviceName}?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="btn btn-danger" 
            type="submit" 
            onClick={(e)=>{
                deleteService(e)
            }}
            id={queueId}>
              Excluir Contrato
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

export default DeleteRequiredContract