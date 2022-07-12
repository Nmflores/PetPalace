import { Alert, Button } from 'react-bootstrap';
import { useState} from 'react'
import React from 'react'
import './dismissable-primary.css';


const PrimaryDismissable = ({text}) => {
    const [show, setShow] = useState(true);
  
    if (show) {
      if(text.length > 0){
        return (
            <Alert variant="success" onClose={() => setShow(false)} dismissible className='success'> 
              <p>
                {text}
              </p>
            </Alert>
          )
      }else{
        return (
            <Alert variant="success" onClose={() => setShow(false)} dismissible className='success d-none'>
              <p>
                {text}
              </p>
            </Alert>
          )
      }
    }
  }
  
export default PrimaryDismissable