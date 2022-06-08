import { React, useState } from 'react';
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';

const RegisterModal = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Cadastre-se
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>          
            <FloatingLabel
              controlId="floatingInput"
              label="Email"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Senha">
              <Form.Control type="password" placeholder="Sua senha" />
            </FloatingLabel>                      
          </Form>
        </Modal.Body>
        <Modal.Footer>          
          <Button variant="primary" type="submit" onClick={handleClose}>
            Enviar
          </Button>
          <Button variant='secondary' onClick={handleClose}>
            Voltar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
 
export default RegisterModal;