import { Alert, Button } from 'react-bootstrap';
import {React, useState} from 'react'


const AlertDismissibleExample = async ({text}) => {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="warning" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Algo não deu certo!!!</Alert.Heading>
          <p>
            {text}
          </p>
        </Alert>
      );
    }
    return <Button onClick={() => setShow(true)}>Show Alert</Button>;
  }
  
export default AlertDismissibleExample