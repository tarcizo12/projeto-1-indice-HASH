import React from 'react';
import '../index.css';

function Input(props) {
    return(
        <input className='CampoInput' type="text" placeholder={props.texto} />
    );
}

export default Input;