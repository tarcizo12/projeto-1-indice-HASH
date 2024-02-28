import React from 'react';
import '../App.css';

function SimpleButton({ onClick, label }) {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
}

export default SimpleButton;
