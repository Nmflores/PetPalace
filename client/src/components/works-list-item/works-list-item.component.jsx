import "./works-list-item.styles.css"

import { ListGroup, Button } from 'react-bootstrap'

const WorkListItem = ({work}) => {
        const { service_id, service_name } = work;  
        return(
            <ListGroup.Item key={service_id}>
                <p>{service_name}</p>
                <Button variant="primary">Excluir serviço</Button>
            </ListGroup.Item>
        )
}

export default WorkListItem;