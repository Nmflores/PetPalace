import WorkListItem from "../perfil-works-item/perfil-works-item.component"
import './perfil-works.styles.css'
import { useState } from 'react'
import Axios from 'axios'
import Select from 'react-select'
import AlertDismissible from "../alerts/alert-dismissable.component"

import { ListGroup, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';



const AddServiceToUser = ({ userId }) => {
    const [serviceId, setServiceId] = useState()
    const [price, setPrice] = useState()
    const serviceOptions = [
        { value: 0, label: 'Passeio' },
        { value: 1, label: 'Pet Sitting' },
        { value: 2, label: 'Hospedagem' },
        { value: 3, label: 'Banho' },
        { value: 4, label: 'Lar Provisorio' },
    ]


    const [message, setMessage] = useState("")

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const addService = async (event, userId, serviceId, price) => {
        event.preventDefault()
        serviceId = parseInt(serviceId)
        price = parseFloat(price)
        console.log(event, userId, serviceId, price)
        Axios.post(`http://localhost:8080/api/v1/workers`, {
            userId,
            serviceId,
            price
        }
        ).then((response) => {
            console.log("1", response)
            setMessage(response.data.data)

        }).catch((err) => {
            console.log("2", err.response)
            setMessage(err.rdata.data)
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
                    <Form>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Preço"
                            className="mb-3"
                        >
                            <Form.Control type="number" placeholder={price} onChange={((e) => { setPrice(e.target.value) })} />
                        </FloatingLabel>


                        <Select
                            placeholder="Selecione o serviço"
                            name="servico"
                            options={serviceOptions}
                            onChange={selectedOption => setServiceId(selectedOption.value)}
                        />

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"
                        type="submit"
                        onClick={(e) => {
                            addService(e, userId, serviceId, price)
                        }}
                        id={serviceId}>
                        Adicionar Serviço
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


const WorksList = ({ works }) => {
    console.log("works 3:", works)
    const userId = '4ac85347-72f7-48e5-a469-eac17735e0c4';


    return (
        <div>
            <h2>Serviços Listados</h2>
            <AddServiceToUser userId={userId} />
            <hr></hr>
            <div className='servicesList'>
                {works !== undefined ?
                    <ListGroup ListGroup key={works.serviceId}>
                        {works.map((work) => {
                            return <WorkListItem key={work.serviceId} work={work} />
                        })}
                    </ListGroup> : "Nenhum serviço Disponivel"}
            </div>
        </div >
    )
}

export default WorksList