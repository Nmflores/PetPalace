import React from 'react';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-copyright">
        <div>
        <p> © {(new Date().getFullYear())} CrpytoKet, Inc. All Rights Reserved</p>
        </div>        
      </div>
    </div>
  );
}
 
export default Footer;