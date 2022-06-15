import { React, useState, useEffect } from 'react';
import {BiFilter} from 'react-icons/bi';
import useCollapse from "react-collapsed";
import { Form } from 'react-bootstrap';

import './filter.css';

const Filter = ({isActive}) => {

  const [isExpanded, setExpanded] = useState(isActive);
  const { getToggleProps, getCollapseProps } = useCollapse({
    isExpanded
  });

  useEffect(() => {
    setExpanded(isActive);
  }, [isActive, setExpanded]);

  return (
    <>
      <div 
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
        <Form.Select aria-label="Default select example">
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </div>
    </>    
  );
}

export default Filter;