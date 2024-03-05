import React from "react";
import "../index.css";

function Statistics(props) {
    console.log('Props recebidas em Statistics:', props); // Adicionado para debug

    return (
        <div className="StatisticsElement">
            <h2 className="TextoStats">Colisões:</h2>
            <p className="TextoStats">{props.numberOfColisions}</p>
            <h2 className="TextoStats">Overflows:</h2>
            <p className="TextoStats">{props.numberOfOverflows}</p>
        </div>
    );
}

export default Statistics;
