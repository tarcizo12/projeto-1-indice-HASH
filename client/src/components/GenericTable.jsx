import React from "react";
import { useState, useEffect } from 'react';

//receber um objeto de página
//objeto vai conter as tuplas
//cada tupla e composta de dois atributos: line e valueOfData

const GenericTable = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
    // Realize a solicitação para o backend ao montar o componente
    fetch('')
    .then(response => response.json())
    .then(data => {
        // Atualize o estado com os dados recebidos do backend
        setData(data);
    })
    .catch(error => console.error('Erro na solicitação:', error));
  }, []); // O segundo argumento vazio significa que o efeito é executado apenas uma vez ao montar o componente
    return (
        <table>
        <thead>
            <tr>
            <th>Linha</th>
            <th>Valor</th>
            </tr>
        </thead>
        <tbody>
            {data.map((row, index) => (
            <tr key={index}>
                <td>{row.attribute}</td>
                <td>{row.value}</td>
            </tr>
            ))}
        </tbody>
        </table>
    );
};

export default GenericTable;
