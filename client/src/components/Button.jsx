import React from 'react';
import '../index.css';

function SimpleButton({ onClick, label }) {
  return (
    <button className="BotaoForm" onClick={onClick}>
      {label}
    </button>
  );
}

export default SimpleButton;
