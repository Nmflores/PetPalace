import { useState } from 'react';
import DeleteServiceModal from '../modals/excluir-servico.modal'
import EditPriceModal from '../modals/editar-servico.modal'
import Axios from 'axios'
import React from 'react'
import { Card, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
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

const WorkListItem = ({ work, callbackPrice, callbackWorkDelete }) => {
    const { serviceName, serviceId, price } = work

    return (

        <Card className="serviceItem" style={{ width: '13rem' }}>
            <div className="buttonsContainer">
                <EditPriceModal
                    serviceId={serviceId}
                    price={price}
                    callbackPrice={callbackPrice}
                />
                <div className="deleteButton">
                    <DeleteServiceModal
                        serviceId={serviceId}
                        serviceName={titleize(serviceName)}
                        callbackWorkDelete={callbackWorkDelete}
                    />
                </div>
            </div>
            <Card.Body>
                <Card.Title className="mt-2 mb-3"><h5>{titleize(serviceName)}</h5></Card.Title>
                <Card.Text>
                    <p className="priceWork">R$ {price}</p>
                </Card.Text>

            </Card.Body>
        </Card>
    )
}


export default WorkListItem;