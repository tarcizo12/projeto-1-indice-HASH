import React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import Label from "./Label";
import "../index.css";

function InitialPage() {
    const [registroPorPagina, setRegistroPorPagina] = useState('');
    const navigate = useNavigate();

    const handleClick = async () => {
        // try {
        //     // Enviar numero de registros por pagina para o backend
        //     // URL bo backend
        //     const response = await fetch('', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ RegistroPorPagina: registroPorPagina }),
        //     });

        //     // Verificar se a solicitação foi bem-sucedida
        //     if (response.ok) {
        //         alert("Parâmetros enviados! Aguarde alguns instantes");
        //     } else {
        //         alert("Erro ao enviar parâmetros para o backend");
        //     }
        // } catch (error) {
        //     console.error("Erro ao enviar solicitação:", error);
        // }
        navigate("/second");
    };

    return (
        <div className="container">
            <h1 className="TituloForm">Implemente uma função hash estática</h1>
            <Label descricao="Insira aqui o número de registro por página" />
            <Input type="number" texto=" Número de registros por página" value={registroPorPagina}
                onChange={(e) => setRegistroPorPagina(e.target.value)}/>

            <div className="BotaoPagina">
                <Button onClick={handleClick} label="Enviar" />
            </div>
        </div>
    );
}

export default InitialPage;
