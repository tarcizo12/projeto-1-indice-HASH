import React from 'react';
import '../index.css';

function Input(props) {
  return (
    <input
      className='CampoInput'
      type={props.type}
      placeholder={props.texto}
      value={props.value}  // Adiciona a propriedade value ao input
      onChange={(e) => props.onChange(e.target.value)}  // Passa o valor do input para a função onChange
    />
  );
}

export default Input;
