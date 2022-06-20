import React from 'react';

import picture from '../../assets/icon.gif';
import './ProfilePicture.css';

const ProfilePicture = () => {
  return (
    <div className='picture-container'>
      <img className='picture' src={picture} alt='foto de perfil'/>
    </div>
  );
}
 
export default ProfilePicture;