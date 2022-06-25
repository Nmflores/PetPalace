import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import {Header, CardList,Filter } from '../../components'

const Home = () => {

  return <div className='homeContainer'>
   <Link to="profile/1">tela_perfil</Link>
   <Header />
   <Filter />
   {/*<HomeWorksList works={works} / >*/}
  </div>;
};

export default Home
