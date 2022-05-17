//import './card-pets.styles.css'
import {ListGroup, Button} from 'react-bootstrap'

const PetsListItem = ({pet}) => {
        const { petId, petName } = pet;  

        return(
            <ListGroup.Item key={petId}>
                <p>{petName}</p>
                <Button variant="primary">Editar Pet</Button>{' '}
                <Button variant="primary">Excluir Pet</Button>{' '}
            </ListGroup.Item>
           
        )
}

export default PetsListItem;