import React from "react";
//import { useState } from 'react';
import SimpleButton from "./SimpleButton"; // Assuming the SimpleButton component is in the same directory
import Input from "./Input";
import Label from "./Label";
import "../index.css";

function InitialPage() {
    const handleClick = () => {
    alert("Parametros enviados! Aguarde alguns instantes");
    };

    /*const [formData, setFormData] = useState({
        RegistroPorPagina: '',
    });*/

    return (
        <div className="container">
            <h1 className="TituloForm">Implemente uma função hash estática</h1>
            <Label descricao="Insira aqui o número de registro por página" />
            <Input texto=" Número de registros por página" />

            <div className="BotaoPagina">
                <SimpleButton onClick={handleClick} label="Enviar" />
            </div>
        </div>
    );
}

export default InitialPage;
