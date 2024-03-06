import React from "react";
import "../index.css";


function Table (props) {
    return (
        <table className="TabelaPagina">
        <thead>
            <tr>
            <th>Linha</th>
            <th>Valor</th>
            </tr>
        </thead>
        <tbody>
        {props.data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.line}</td>
                        <td>{item.valueOfData}</td>
                    </tr>
                ))}
        </tbody>
        </table>
    );
};

export default Table;
