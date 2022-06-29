import Axios from 'axios'
import {useState} from 'react'
import React from 'react'
import AlertDismissible from "../alerts/alert-dismissable.component"

import { ListGroup, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';


const DeletePetModal = ({ pet }) => {
    const [message, setMessage] = useState("")

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const deletePet = async (e) => {
        e.preventDefault()
        const petId = e.target.id
        Axios.delete(`http://localhost:8080/api/v1/pets/${petId}`)
        .then((response) => {
            console.log(response.data)
            setMessage(response.data.data)
        }).catch((err) => {
          console.log(err)
          setMessage(err.response.data.data)
        })

    }

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Excluir Pet
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Excluir Pet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {message.length > 0 ? message : ""}            
          <p>Você tem certeza que deseja excluir o Pet {pet.petName}?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" 
            type="submit" 
            id={pet.petId}
            onClick={(e)=>{
              deletePet(e)
            }}>
              Excluir Pet
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

export default DeletePetModal