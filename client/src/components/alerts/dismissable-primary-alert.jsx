import { Alert, Button } from 'react-bootstrap';
import { useState} from 'react'
import React from 'react'


const PrimaryDismissable = ({text}) => {
    const [show, setShow] = useState(true);
  
    if (show) {
      if(text.length > 0){
        return (
            <Alert variant="primary" onClose={() => setShow(false)} dismissible className='primary'> 
              <p>
                {text}
              </p>
            </Alert>
          )
      }else{
        return (
            <Alert variant="primary" onClose={() => setShow(false)} dismissible className='primary d-none'>
              <p>
                {text}
              </p>
            </Alert>
          )
      }
    }
  }
  
export default PrimaryDismissable