import { Alert, Button } from 'react-bootstrap';
import { useState } from 'react'
import React from 'react'


const PrimaryAlert = ({ text }) => {
    if(text.length > 0) {
    return (
        <Alert key='primary' variant='success' className='primary'>
            {text}
        </Alert>
    )
    }else{
        return (
            <Alert key='primary' variant='success' className='primary d-none'>
                {text}
            </Alert>
        )
    }
}

export default PrimaryAlert