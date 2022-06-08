import {React, useState} from 'react';
import Banner from '../banner/Banner';

import './header.css';

const Header = () => {

  //const [openModal, setOpenModal] = useState(false)    

  return (

    <div>
      <Banner />
    </div>

    // <div className='header-container'>  
    //   <button
    //     className='openModalBtn'
    //     onClick={() => {
    //       setOpenModal(true) // Ao clicar, muda state para true
    //     }}
    //   ><h2>LOGIN</h2></button>
    //   <h2>CADASTRO</h2>      

    //   {/*Renderiza modal apenas se state for true*/}
    //   {/*closeModal recebe o state para modal poder ser fechado de dentro*/}
    //   {openModal && <LoginModal closeModal={setOpenModal}/>}      

    //</div>
  );
}
 
export default Header;