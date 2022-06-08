import { React } from 'react';
import './navbar.css';
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";

import LoginModal from '../loginModal/LoginModal'
import RegisterModal from '../registerModal/RegisterModal'

const Navbar = () => {

  return (
    <div className='navbar'>
      <div className='navbar-links'>
        <div className='navbar-links_logo'>
          <img src={logo} alt='logo' width='32px' height='32px' />
          <Link to="/"> 
            <h1>PetPalace</h1>
          </Link>
          <LoginModal />
          <RegisterModal />
        </div>
      </div>
    </div>
  );
}
 
export default Navbar;