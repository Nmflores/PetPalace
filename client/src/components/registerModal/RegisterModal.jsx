import { React, useState } from 'react';
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';

const RegisterModal = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Cadastre-se
      </Button>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cadastro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="email"
                placeholder="Email"
              />
              <label htmlFor="floatingInputCustom">Email</label>
            </Form.Floating>
            <Form.Floating  className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="text"
                placeholder="Nome"
                required
              />
              <label htmlFor="floatingInputCustom">Nome</label>
              <Form.Control.Feedback type="invalid">Nome obrigatório!</Form.Control.Feedback>
            </Form.Floating>
            <Form.Floating  className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="text"
                placeholder="Telefone"
              />
              <label htmlFor="floatingInputCustom">Telefone</label>
            </Form.Floating>
            <Form.Floating>
              <Form.Control
                id="floatingPasswordCustom"
                type="password"
                placeholder="Password"
              />
              <label htmlFor="floatingPasswordCustom">Senha</label>
            </Form.Floating>
          </Modal.Body>
          <Modal.Footer>          
            <Button variant="primary" type="submit" >
              Enviar
            </Button>
            <Button variant='secondary' onClick={handleClose}>
              Voltar
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
  );
}
 
export default RegisterModal;