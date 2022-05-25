import React from 'react';
import {BiFilter} from 'react-icons/bi';

import './filter.css';

const Filter = () => {
  return (
    <div className='filter-container'>
      <p>Filtro</p><BiFilter onClick=''/>
    </div>
  );
}
 
export default Filter;