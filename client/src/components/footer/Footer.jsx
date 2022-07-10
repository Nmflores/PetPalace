import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <p> © {(new Date().getFullYear())} PetPalace. All Rights Reserved</p>
    </div>
  );
}
 
export default Footer;