import Axios from 'axios'
import { useState } from 'react'
import AlertDismissible from "../alerts/alert-dismissable.component"
import Select from 'react-select'


import { ListGroup, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';


const AddServiceModal = ({ userId }) => {
    const [message, setMessage] = useState("")
    const [price, setPrice] = useState()
    const [serviceId, setServiceId] = useState()

    const serviceOptions = [
        { value: 0, label: 'Passeio' },
        { value: 1, label: 'Pet Sitting' },
        { value: 2, label: 'Hospedagem' },
        { value: 3, label: 'Banho' },
        { value: 4, label: 'Lar Provisorio' }
    ]

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const addService = async (e, userId, serviceId, price) => {
        e.stopPropagation()
        serviceId = parseInt(serviceId)
        await Axios.delete(`http://localhost:8080/api/v1/workers`, {
            userId,
            serviceId,
            price
        }
        ).then((response) => {
            console.log(`SHOWME1${response.data}`)
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