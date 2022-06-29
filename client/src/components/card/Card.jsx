import { useState, useEffect } from 'react';
import React from 'react';

import useCollapse from "react-collapsed";
import { Button } from 'react-bootstrap';
import Axios from 'axios'

import './Card.css';
import { ProfilePicture } from '../';
import iconCat from '../../assets/cat-icon.png';
import iconDog from '../../assets/dog-icon.png';

function titleize(text) {
  var loweredText = text.toLowerCase();
  var words = loweredText.split(" ");
  for (var a = 0; a < words.length; a++) {
    var w = words[a];

    var firstLetter = w[0];
    w = firstLetter.toUpperCase() + w.slice(1);

    words[a] = w;
  }
  return words.join(" ");
}

function RenderBasedOnUserId({ userId, contactNbr, registerContract }) {
  if (userId !== "") {
    return (
      <div>
        <h3>Telefone: {contactNbr}</h3>
        <Button onClick={() => registerContract()}>Contratar</Button>
      </div>
    )
  }
  else {
    return (
      "Entre para poder Contratar"
    )
  }
}



const Card = ({ service, isActive }) => {
  const userId = localStorage.getItem("userId");;
  const [message, setMessage] = useState("")
  const [contactNbr, setContactNbr] = useState("")

  const [isExpanded, setExpanded] = useState(isActive);
  const { getToggleProps, getCollapseProps } = useCollapse({
    isExpanded
  });

  const { workerId, firstName, secondName, serviceId, serviceName, price } = service

  let fullName = `${titleize(firstName)} ${titleize(secondName)}`

  useEffect(() => {
    setExpanded(isActive)
    Axios.get(`http://localhost:8080/api/v1/users/${workerId}`)
      .then((response) => {
        setContactNbr(response.data.data[0].contactNbr)
      })
  }, [isActive, setExpanded]);

  const registerContract = async (petTypes) => {
    Axios.post(`http://localhost:8080/api/v1/contracts`,
      {
        workerId,
        ownerId: userId,
        serviceId,
        price,
        petTypes,
      })
      .then((response) => {
        setMessage(response.data.data)
      })
  }


  return (
    <>
      {message.length > 0 || message !== undefined ? message : ""}
      {userId !== workerId ?      <div>
        <div
          className='card-container'
          {...getToggleProps({
            onClick: () => setExpanded((x) => !x)
          })}
        >
          <ProfilePicture />
          <div className='card-description'>
            <h2>{fullName}</h2>
            <h3>{titleize(serviceName)}</h3>
            {/* <div className='pet-container'>
            {service.petTypes.map(element => (
              <img 
                className='petIcon'
                src={element.petType==='C' ? iconCat : iconDog} 
                alt="Pet icon"
              />
            ))}
          </div>         */}
          </div>
          <div className='price'>
            <h3>R$ {price}</h3>
          </div>
        </div>
        <div
          {...getCollapseProps()}
          className='details'
        >
          <RenderBasedOnUserId workerId={workerId} userId={userId} contactNbr={contactNbr} registerContract={registerContract} />
        </div>
      </div> : ""}
    </>
  )
}

export default Card;