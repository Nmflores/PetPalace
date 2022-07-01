import React from 'react';
import './navbar.css';
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap'
import LoginModal from '../loginModal/LoginModal'
import RegisterModal from '../registerModal/RegisterModal'

function loggout(){
  localStorage.setItem("userId","")
  window.location.assign("/")
}

function ReturnBasedOnUserId({userId}) {
  if(userId !== ""){
    return (        
      <div className='navbarLoggedButtons'>
        <Button variant="success"><Link to="profile/1">Perfil</Link></Button>
        <Button onClick={loggout}>Sair</Button>
      </div>
    )
  }else{
    return(
      <div className='navbarButtons'>
        <LoginModal className='loginBtn'/>
        <RegisterModal className='registerBtn' />
      </div>
    )
  }
}

const Navbar = () => {
  const userId = localStorage.getItem("userId");

  return (
    <div className='navbar'>
      <div className='navbar-links'>
        <div className='navbar-links_logo'>
          <img src={logo} alt='logo' width='32px' height='32px' />
          
            <h1><Link to="/">PetPalace </Link></h1>
         
        </div>
      </div>
    <ReturnBasedOnUserId userId={userId} />
    </div>
  );
}

export default Navbar;