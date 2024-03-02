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
                        <td>{item.attribute}</td>
                        <td>{item.value}</td>
                    </tr>
                ))}
        </tbody>
        </table>
    );
};

export default Table;
