import './Menu.style.css'
import React, { useState } from 'react';
import Login from "../login/Login.component";
import Cadastro from "../cadastro/Cadastro.component";

import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';

export default function Menu() {
  const handleSelect = (eventKey) => alert(`selected ${eventKey}`);
  const [dropdown, setDropdown] = useState("");

  const showDropdown = () => {
    console.log("show");
    //se clicar no botão, modal aparece
    setDropdown("show");
    document.body.addEventListener("click", closeDropdown);
  }

  const closeDropdown = event => {
    console.log("hidden");
    setDropdown("");
    document.body.removeEventListener("click", closeDropdown);
  };
  return (
    <div className="menu">
      <Nav defaultActiveKey="/home" as="ul">
        <Nav.Item as="li">
          <Nav.Link href="/home">PetPalace</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <NavDropdown title="Serviços" id="nav-dropdown">
            <NavDropdown.Item eventKey="4.1">Hospedagem</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2">Passeio</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">Banho</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.4">Tosa</NavDropdown.Item>
          </NavDropdown>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-2"><Login/></Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-3"><Cadastro /></Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}

