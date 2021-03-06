import Axios from 'axios'
import {useState} from 'react'
import React from 'react'
import AutoAlert from '../alerts/auto-alert' 

import { ListGroup, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { useRef } from 'react';
 


const EditPriceModal = ({userId, serviceId, price, callbackPrice}) => {
    const [actualPrice, setPrice] = useState(price)

    const [message, setMessage] = useState("")

    const [show, setShow] = useState(false);

    const isConfirmed = useRef(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const updatePrice = async (e) => {
        e.preventDefault()
        isConfirmed.current = true
        console.log(actualPrice)
        const userId = localStorage.getItem("userId")
        serviceId = parseInt(serviceId)
        setPrice(parseFloat(actualPrice))
        console.log(isConfirmed)
        callbackPrice(isConfirmed.current)
        Axios.put(`http://localhost:8080/api/v1/workers`,{
            userId,
            serviceId, 
            price:actualPrice
        }
        ).then((response) => {
            console.log(response.data)
            setMessage(response.data.data)
        })
    }

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Editar Preço
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Preço</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {message.length > 0 ? <AutoAlert text={message} type="success"/> : ""}
            <Form>
              <FloatingLabel
                controlId="floatingInput"
                label="Preço"
                className="mb-3"
              >
                <Form.Control type="number" placeholder={price} onChange={((e)=>{setPrice(e.target.value)})} />
              </FloatingLabel>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" 
            type="submit" 
            onClick={(e)=>{
                updatePrice(e)
            }}
            id={serviceId}>
              Editar Preço
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

  export default EditPriceModal