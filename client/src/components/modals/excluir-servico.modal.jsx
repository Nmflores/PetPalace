import Axios from 'axios'
import {useState} from 'react'
import React from 'react'

import { ListGroup, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';


const DeleteServiceModal = ({serviceName, serviceId}) => {
    const [message, setMessage] = useState("")

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const deleteService = async (e) => {
        e.preventDefault()
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

    }

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Excluir Serviço
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Excluir Serviço</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {message.length > 0 ? message : ""}            
          <p>Você tem certeza que deseja excluir o serviço {serviceName}?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" 
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