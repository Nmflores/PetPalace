import { useState } from 'react';
import React from 'react';

import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import Axios from 'axios'
import './loginModal.css';

const LoginModal = () => {
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(email, password)

  const logIn = async () => {
    Axios.post(`http://localhost:8080/api/v1/login`,{email, password})
    .then((response) => {
      console.log("response login: ",response.data)
      localStorage.setItem("userId",response.data.accessToken)
      setMessage(response.data.data)
    }).catch(err => {
      setMessage(err.response.data.data)
    })
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {message.length > 0 ? message : ""}
          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="Email"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="name@example.com" onChange={event=>setEmail(event.target.value)}/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Senha">
              <Form.Control type="password" placeholder="Sua senha" onChange={event=>setPassword(event.target.value)}/>
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={logIn}>
            Entrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
 
export default LoginModal;