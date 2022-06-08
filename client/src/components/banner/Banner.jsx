import React from 'react';
import './banner.css'
import banner from '../../assets/banner.jpg';

const Banner = () => {
  return (
    <div className='bannerContainer'>
      <img className='bannerImg' src={banner} alt='banner'/>
    </div>
  );
}
 
export default Banner;