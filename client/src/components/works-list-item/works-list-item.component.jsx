import "./works-list-item.styles.css"

import { ListGroup, Button } from 'react-bootstrap'
import DeleteServiceModal from '../../modals/excluir-servico.modal'
import EditServiceModal from '../../modals/editar-servico.modal'
import './works-list-item.styles.css'

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

const WorkListItem = ({work}) => {
        console.log(work)
        const { workerId, serviceId, serviceName, price } = work;  
        return(
            <ListGroup.Item key={serviceId}>
                <div className="serviceNameWork">
                    {titleize(serviceName)}
                </div>                
                <div className="servicePriceWork">
                    R${price}
                </div>
                <EditServiceModal userId={workerId} serviceId={serviceId} price={price}/>
                <DeleteServiceModal userId={workerId} serviceId={serviceId} serviceName={serviceName}/>
            </ListGroup.Item>
        )
}

export default WorkListItem;