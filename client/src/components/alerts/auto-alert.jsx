import { Alert, Button } from 'react-bootstrap';
import { useState } from 'react'
import React from 'react'


const AutoAlert = ({ type, text }) => {
    if(text.length > 0) {
    return (
        <Alert key={type} variant={type} className={type}>
            {text}
        </Alert>
    )
    }else{
        return (
            <Alert key={type} variant={type} className={`${type} d-none`}>
                {text}
            </Alert>
        )
    }
}

export default AutoAlert