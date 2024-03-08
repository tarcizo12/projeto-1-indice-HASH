//import React, { useState, useEffect } from "react";
import '../index.css';
import { useSpring, animated } from 'react-spring';

function Statistics(props) {
  const animate = useSpring({
    from: { transform: 'scale(0)' },
    to: { transform: 'scale(1)' },
  });

  return (
    <animated.div className="StatisticsElement" style={animate}>
      <h2 className="TextoStats">Colisões:</h2>
      <p className="TextoStats">{`${props.numberOfCollisions}%`}</p>
      <h2 className="TextoStats">Overflows:</h2>
      <p className="TextoStats">{`${props.numberOfOverflows}%`}</p>
    </animated.div>
  );
}

export default Statistics;
