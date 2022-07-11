import { useState } from 'react';
import React from 'react';
import Select from 'react-select'
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import Axios from 'axios'


const RegisterModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [message, setMessage] = useState("")

  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [secondName, setSecondName] = useState("")
  const [gender, setGender] = useState("")
  const [contactNbr, setContactNbr] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [cpf, setCpf] = useState("")

  console.log(email, firstName, secondName, contactNbr, password, confirmPassword)

  const genderOptions = [
    { value: 'm', label: 'Masculino' },
    { value: 'f', label: 'Feminino' },
  ]


  const registerUser = async () => {
    Axios.post("http://localhost:8080/api/v1/register", { email, firstName, secondName, userGender: gender, contactNbr, password, cpf })
      .then((response) => {
        console.log(response)
        setMessage(response.data.data)
      }).catch(err => {
        setMessage(err.response.data.data)
      })
  }


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Cadastro
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message.length > 0 ? message : ""}
          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="Primeiro nome"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Primeiro nome" onChange={event => setFirstName(event.target.value)} />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Segundo nome"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Segundo nome" onChange={event => setSecondName(event.target.value)} />
            </FloatingLabel>


            <label htmlFor="genderSelect">Sexo</label>
            <Select
              name="genderSelect"
              options={genderOptions}
              onChange={selectedOption => setGender(selectedOption.value)}
            />

            <br />


            <FloatingLabel controlId="floatingCpf" label="Cpf">
              <Form.Control type="text" placeholder="Cpf" onChange={event => setCpf(event.target.value)} />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label="Telefone"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Telefone" onChange={event => setContactNbr(event.target.value)} />
            </FloatingLabel>



            <FloatingLabel
              controlId="floatingInput"
              label="Email"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="name@example.com" onChange={event => setEmail(event.target.value)} />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Senha">
              <Form.Control type="password" placeholder="Sua senha" onChange={event => setPassword(event.target.value)} />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Confirme sua Senha">
              <Form.Control type="password" placeholder="Confirme sua senha" onChange={event => setConfirmPassword(event.target.value)} />
            </FloatingLabel>


          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={registerUser}>
            Cadastrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default RegisterModal;