import {React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Header, CardList,Filter } from '../../components'
import Axios from 'axios'

const Home = () => {

  const [serviceId, setServiceId] = useState(0)
  const [services, setServices] = useState([])

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/v1/workers/${serviceId}`)
      .then((response) => {
        console.log("pets 1: ",response)
        setServices(response.data.data)
      })
  },[])

  return <div className='homeContainer'>
   <Link to="profile/1">tela_perfil</Link>
   <Header />
   <Filter 
    serviceId={serviceId}
    onChange={((event) => {
      console.log(event.target.id)
    })} 
    />
   <CardList services={services} />
  </div>;
};

export default Home
