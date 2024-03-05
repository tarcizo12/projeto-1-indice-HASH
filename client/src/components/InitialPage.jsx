import React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import Label from "./Label";
import "../index.css";

function InitialPage() {
    const [pageSize, setPageSize] = useState('');
    const navigate = useNavigate();

    const handlePageSizeChange = (e) => {
        setPageSize(e.target.value);
    };

    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:3000/loadData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pageSize: Number(pageSize) }),
            });

            // Verifique se a resposta foi bem-sucedida antes de navegar para a próxima página
            if (response.ok) {
                navigate('/second');
            } else {
                console.error('Erro ao enviar solicitação:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao enviar solicitação:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="TituloForm">Implemente uma função hash estática</h1>
            <Label descricao="Insira aqui o número de registro por página" />
            <Input type="number" texto=" Número de registros por página" value={pageSize} onChange={handlePageSizeChange} />

            <div className="BotaoPagina">
                <Button onClick={handleClick} label="Enviar" />
            </div>
        </div>
    );
}

export default InitialPage;
