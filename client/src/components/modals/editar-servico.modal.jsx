import Axios from 'axios'
import {useState} from 'react'
import AlertDismissible from "../alerts/alert-dismissable.component"

import { ListGroup, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
 


const EditPriceModal = ({userId, serviceId, price}) => {
    const [actualPrice, setPrice] = useState(price)

    const [message, setMessage] = useState("")

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const updatePrice = async (event, userId, serviceId, price) => {
        event.preventDefault();
        serviceId = parseInt(serviceId)
        price = parseFloat(price)
        console.log(event, userId, serviceId, price)
        Axios.put(`http://localhost:8080/api/v1/workers`,{
            userId,
            serviceId, 
            price 
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
          {message.length > 0 ? message : ""}
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
                updatePrice(e, userId, serviceId, actualPrice)
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