import React from 'react';
import '../index.css';

function Label(props) {
    return(
        <label className='CampoLabel'>{props.description}</label>
    );
}

export default Label;