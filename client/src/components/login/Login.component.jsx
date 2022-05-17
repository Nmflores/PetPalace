import { React, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import './Login.style.css'
import Axios from 'axios'


export default function Login(props) {
    const [usernameIpt, setUsernameIpt] = useState('')
    const [passwordIpt, setPasswordIpt] = useState('')


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(`USERNAME: ${usernameIpt}`)
    console.log(`PASSWORD: ${passwordIpt}`)

    const loginTo = () => {
        Axios.post("http://localhost:8080/api/v1/login", {
            username: usernameIpt,
            password: passwordIpt,
        })
            .then((response) => console.log(response))
            .catch(error => console.log(error.response.data.msg))
    }


    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Login
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label htmlFor='uname'>Username</label>
                        <input 
                            type='text'
                            name='uname'
                            onChange={e => setUsernameIpt(e.target.value)}
                            placeholder='Digite seu username'
                        />
                        <br/>
                        <label htmlFor='pass'>Password</label>
                        <input 
                            type='password'
                            name='pass'
                            onChange={e => setPasswordIpt(e.target.value)}
                            placeholder='Digite sua senha'
                        />
                        <br/>
                        
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={loginTo}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

