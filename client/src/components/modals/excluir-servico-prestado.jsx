import Axios from 'axios'
import {useState} from 'react'
import React from 'react'
import './excluir-servico-prestado.css'
import { Button, Modal} from 'react-bootstrap';
import AutoAlert from '../alerts/auto-alert'
import { useRef } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


function DisplayAlert({ text }) {
  if (text.includes('contrato')) {
      return <AutoAlert text={text} type="danger" />
  } else {
      return <AutoAlert text={text} type="success" />
  }
}
const DeleteRequiredContract = ({serviceName, queueId, callbackRequiredContractDelete}) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Clique para excluir Contrato
    </Tooltip>
  )
    const [message, setMessage] = useState("")

    const [show, setShow] = useState(false);

    const isDeleted = useRef(false)
  
    const handleClose = () => setShow(false);
    const handleShow = () => {
      setShow(true)
      setMessage("")
    }

    const deleteService = async (e) => {
        e.preventDefault()
        isDeleted.current = true             
        Axios.delete(`http://localhost:8080/api/v1/contracts`,{
        data:{
          queueId
        }}
        ).then((response) => {
            console.log(response.data)
            setMessage(response.data.data)            
        }).catch((err) => {
          console.log(err.response.data)
          setMessage(err.response.data.data)
        })
        setTimeout(() => {callbackRequiredContractDelete(isDeleted.current)}, 2000)   
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
            <Modal.Title>Excluir contrato</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <DisplayAlert text={message}/>
          <p>Você tem certeza que deseja excluir o contrato {serviceName}?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="btn btn-danger" 
            type="submit" 
            onClick={(e)=>{
                deleteService(e)
            }}
            id={queueId}>
              Excluir Contrato
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

export default DeleteRequiredContract