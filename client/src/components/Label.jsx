import React from 'react';
import '../index.css';

function Label(props) {
    return(
        <label className='CampoLabel'>{props.descricao}</label>
    );
}

export default Label;