import React from "react";
import "../index.css";
import { useSpring, animated } from 'react-spring';


function Statistics(props) {

    const animate = useSpring({
        from: { transform: 'scale(0)' },
        to: { transform: 'scale(1)' },
    });

    return (
        <animated.div className="StatisticsElement " style={animate}>
            <h2 className="TextoStats">Colisões:</h2>
            <p className="TextoStats">{props.colisoes}</p>
            <p className="TextoStats">Overflows: </p>
            <h2 className="TextoStats">{props.overflow}</h2>
        </animated.div>
    );
};

export default Statistics;
