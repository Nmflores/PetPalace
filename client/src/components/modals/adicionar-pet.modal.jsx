import Axios from 'axios'
import { useState } from 'react'
import React from 'react'
import AlertDismissible from "../alerts/alert-dismissable.component"
import Select from 'react-select'


import { ListGroup, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';


const AddPetModal = ({ userId }) => {
    const [message, setMessage] = useState("")
    const [petName, setPetName] = useState("")
    const [petType, setPetType] = useState()
    const [petBreed, setPetBreed] = useState("")

    const petTypesOptions = [
        { value: 0, label: 'Canino' },
        { value: 1, label: 'Felino' },
    ]

    const petBreedsOptionsDog = [
        { value: "Pastor Alemão", label: 'Pastor Alemão' },
        { value: "Pitbull", label: 'PitBull' },        
        { value: "SRD", label: 'SRD' },
    ]

    const petBreedsOptionsCat = [
        { value: "Siames", label: 'Siames' },
        { value: "Americano", label: 'Americano' },
        { value: "SRD", label: 'SRD' },
    ]    

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const addPet = async (e, ownerId, petName, petType, petBreed) => {
        e.preventDefault();
        petType = parseInt(petType)
        console.log(typeof (petName), typeof (petBreed))
        Axios.post(`http://localhost:8080/api/v1/pets`, {
            ownerId,
            petName,
            petType,
            petBreed
        }
        ).then((response) => {
            console.log(`SHOWME1${response.data}`)
            setMessage(response.data.data)
        }).catch((err) => {
            console.log(`${err}`)
            console.log(err.response.data.data)
            setMessage(err.response.data.data)
        })
    }

   

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Adicionar Pet
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Pet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message.length > 0 ? message : ""}
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Nome do Pet"
                        className="mb-3"
                    >
                        <Form.Control type="text" onChange={((e) => { setPetName(e.target.value) })} />
                    </FloatingLabel>
                    <Select
                        name="serviceSelection"
                        options={petTypesOptions}
                        placeholder="Selecione um tipo de Pet"
                        onChange={selectedOption => setPetType(selectedOption.value)}
                    />
                    <Select
                        name="serviceSelection"
                        options={petType == 0 ? petBreedsOptionsDog : petBreedsOptionsCat}
                        placeholder="Selecione uma raça de Pet"
                        onChange={selectedOption => setPetBreed(selectedOption.value)}
                    />
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"
                        type="submit"
                        onClick={(e) => {
                            addPet(e, userId, petName, petType, petBreed)
                        }}>
                        Adicionar Pet
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddPetModal