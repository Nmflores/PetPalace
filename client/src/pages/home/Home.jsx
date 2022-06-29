import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Header, CardList, Filter } from '../../components'
import Axios from 'axios'
import LoadingSpinner from '../../components/loading/Loading'


const Home = () => {

  const [serviceId, setServiceId] = useState(0)
  const [services, setServices] = useState([])

  console.log("service id on home:", serviceId)

  const setServiceIdOnHome = (id) => {
    setServiceId(id)
  }

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/v1/workers/${serviceId}`)
      .then((response) => {
        console.log(response.data.data)
        setServices(response.data.data)
      })
  }, [serviceId])

  function RenderBasedOnWorkerResult({ services }) {
    if (services.length > 0) {
      console.log("aqui vai ")
      return (
        <CardList services={services} />
      )
    } else {
      console.log("aqui porquenao vai ")
      return (<div>Nenhum serviço listado no momento</div>)
    }
  }

  return (
        <div className='homeContainer'>
          <Header />
          <Filter
            serviceId={serviceId}
            callBackHome={setServiceIdOnHome}
          />
          <RenderBasedOnWorkerResult services={services} />
        </div>
  )
}

export default Home
