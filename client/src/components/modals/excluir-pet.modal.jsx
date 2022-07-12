import Axios from 'axios'
import { useState } from 'react'
import React from 'react'
import './excluir-pet-modal.css';

import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import AutoAlert from '../alerts/auto-alert'
import { useRef } from 'react';
import { useEffect } from 'react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';



const DeletePetModal = ({ pet, callbackPetDeleted }) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Clique para excluir Pet
    </Tooltip>
  )
  const [message, setMessage] = useState("")
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isDeleted = useRef(false)

  useEffect(() => { setMessage("") }, [])

  const { petName, petId } = pet

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
          <Modal.Title>Excluir Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message.length > 0 ? <AutoAlert text={message} type="success" /> : ""}
          <p>Você tem certeza que deseja excluir o Pet {petName}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary"
            type="submit"
            id={petId}
            onClick={(e) => {
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