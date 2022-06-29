import Axios from 'axios'
import { useState } from 'react'
import React from 'react'

import AlertDismissible from "../alerts/alert-dismissable.component"
import Select from 'react-select'


import { ListGroup, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';


const AddServiceModal = ({ userId }) => {
    const [message, setMessage] = useState("")
    const [price, setPrice] = useState()
    const [serviceId, setServiceId] = useState()
    const [petTypes, setPetTypes] = useState(["0"])

    const serviceOptions = [
        { value: 0, label: 'Passeio' },
        { value: 1, label: 'Pet Sitting' },
        { value: 2, label: 'Hospedagem' },
        { value: 3, label: 'Banho' },
        { value: 4, label: 'Lar Provisorio' }
    ]

    function removerPorId(array, id) {
        return array.filter(function(el) {       
          return el !== id;       
        });      
      }

    const handlePetTypes = async (event) => {
        let petTypesNow = petTypes
        if(event.target.checked === true){
            setPetTypes([...petTypes, event.target.id])            
        }else{            
            setPetTypes(removerPorId(petTypesNow, event.target.id))
        }
    }
    console.log(petTypes)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addService = async (e, userId, serviceId, price) => {
        e.preventDefault()
        serviceId = parseInt(serviceId)
        await Axios.post(`http://localhost:8080/api/v1/workers`, {
            userId,
            serviceId,
            price,
            petTypes
        }
        ).then((response) => {
            console.log(response.data.data)
            setMessage(response.data.data)
        }).catch((err)=>{
            console.log(`SHOWME2${err.response.data.data}`)
            setMessage(err.response.data.data)
        })
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Adicionar Serviço
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Serviço</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message.length > 0 ? message : ""}
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Preço"
                        className="mb-3"
                    >
                        <Form.Control type="number" placeholder={price} onChange={((e) => { setPrice(e.target.value) })} />
                    </FloatingLabel>
                    <Select
                        name="serviceSelection"
                        options={serviceOptions}
                        onChange={selectedOption => setServiceId(selectedOption.value)}
                    />
                    <div className='my-3'>
                        <h4>Tipos de animais aceitos</h4>
                        <Form.Check 
                            type="checkbox"
                            id="0"
                            label="Canino"
                            defaultChecked
                            onChange={(event) => handlePetTypes(event)}
                        />
                        <Form.Check 
                            type="checkbox"
                            id="1"
                            label="Felino"
                            onChange={(event) => handlePetTypes(event)}
                        />
                    </div>                                            
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"
                        type="submit"
                        onClick={(e) => {
                            addService(e, userId, serviceId, price)
                        }}>
                        Adicionar Serviço
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddServiceModal