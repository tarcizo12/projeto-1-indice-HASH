import React from 'react';
import SimpleButton from './components/SimpleButton'; // Assuming the SimpleButton component is in the same directory
import Input from './components/Input';
import Label from './components/Label';
import './index.css';

function App() {
  const handleClick = () => {
    alert('Parametros enviados! Aguarde alguns instantes');
  };

  return (
    <div className='container'>
      <h1 className='TituloForm'>Implemente uma função hash estática</h1>
      <Label descricao="Insira aqui o número de registro por página" />
      <Input texto=" Número de registros por página"  />
      <Label descricao="Insira aqui a chave de busca ou o elemento a ser buscado na base de dados"/>
      <Input texto=" Chave de busca ou elemento"/>
      <SimpleButton onClick={handleClick} label="Enviar" />
    </div>

  );
}

export default App;
