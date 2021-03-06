import Axios from 'axios'
import {useState} from 'react'
import React from 'react'

import { ListGroup, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import AutoAlert from '../alerts/auto-alert'
import { useRef } from 'react';
import { useEffect } from 'react';


const DeletePetModal = ({ pet, callbackPetDeleted }) => {
    const [message, setMessage] = useState("")
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const isDeleted = useRef(false)

    useEffect(() => {setMessage("")},[])

    const {petName, petId} = pet

    const deletePet = async (e) => {
        e.preventDefault()
        const petId = e.target.id
        isDeleted.current = true
        Axios.delete(`http://localhost:8080/api/v1/pets/${petId}`)
        .then((response) => {
            console.log(response.data)
            setMessage(response.data.data)
        }).catch((err) => {
          console.log(err)
          setMessage(err.response.data.data)
        })
        callbackPetDeleted(isDeleted.current)
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
          {message.length > 0 ? <AutoAlert text={message} type="success"/> : ""}            
          <p>Você tem certeza que deseja excluir o Pet {petName}?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" 
            type="submit" 
            id={petId}
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