import { useState, useEffect } from 'react';
import React from 'react'

import {BiFilter} from 'react-icons/bi';
import useCollapse from "react-collapsed";
import { Form } from 'react-bootstrap';

import './filter.css';

const Filter = ({isActive, serviceId, callBackHome}) => {

  const [id, setId] = useState(serviceId)
  console.log("id on filter:", id)

  const [isExpanded, setExpanded] = useState(isActive);
  const { getToggleProps, getCollapseProps } = useCollapse({
    isExpanded
  })

  useEffect(() => {
    setExpanded(isActive);
  }, [isActive, setExpanded]);

  return (
    <>
      <div
        id={id}
        className='filter-container'
        {...getToggleProps({
          onClick: () => setExpanded((x) => !x)
        })}
      >
        <p>Filtro</p><BiFilter onClick=''/>
      </div>
      <div
        className='filters'
        {...getCollapseProps()}
      >
        <Form.Select 
          id={id}
          aria-label="Default select example"
          onChange={(selectedOption) => {
            callBackHome(selectedOption.target.value)
            setId(parseInt(selectedOption.target.value))
          }}
        >
          <option>Selecione tipo de serviço...</option>
          <option value="0">Passeio</option>
          <option value="1">Pet Sitter</option>
          <option value="2">Hospedagem</option>
          <option value="3">Banho</option>
          <option value="4">Lar provisório</option>
        </Form.Select>
      </div>
    </>    
  );
}

export default Filter;