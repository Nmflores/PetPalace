import React from 'react';
import DeleteServiceModal from '../modals/excluir-servico.modal'
import EditPriceModal from '../modals/editar-servico.modal'

import { ListGroup, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import "./perfil-works-item.styles.css"

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


const WorkListItem = ({ work }) => {
    const { serviceName, serviceId, price } = work

    return (
        <div>
            <ListGroup.Item key={serviceId} className='itemWorkContainer'>
                <div className="detailsContainerWork">
                    <p className="serviceWork">{titleize(serviceName)}</p>
                    <p className="priceWork">R$ {price}</p>
                </div>            
                <div className="buttonsContainer">
                    <div className="deleteButton">
                        <DeleteServiceModal               
                            serviceId={serviceId} 
                            serviceName={titleize(serviceName)}
                        />
                    </div>            
                    <EditPriceModal 
                        serviceId={serviceId} 
                        price={price}
                    />
                </div>            
            </ListGroup.Item>
        </div>
    )
}

export default WorkListItem;