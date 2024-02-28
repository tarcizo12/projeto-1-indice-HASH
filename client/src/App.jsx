import React from 'react';
import SimpleButton from './components/SimpleButton'; // Assuming the SimpleButton component is in the same directory
import './App.css';

function App() {
  const handleClick = () => {
    alert('Parametros enviados! Aguarde alguns instantes');
  };

  return (
    <div>
      <h1 className=''>Implemente uma função hash</h1>
      <SimpleButton onClick={handleClick} label="Enviar parâmetros" />
    </div>
  );
}

export default App;
