import React from "react";
import { useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";
import Label from "./Label";
import Table from "./Table";
import "../index.css";
import Statistics from "./Statistics";

//receber um objeto de página
//objeto vai conter as tuplas
//cada tupla e composta de dois atributos: line e valueOfData


function SecondPage() {

    const [value, setValue] = useState(""); // Defina o valor desejado
    const [page, setPage] = useState(null);

    const [stats, setStats] = useState({ colisoes: 0, overflow: 0 });
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:3001/statics');
                const data = await response.json();

                console.log('Dados recebidos:', data); // Adicionado para debug
                setStats(data.values.statics);
            } catch (error) {
                console.error('Erro ao buscar estatísticas:', error);
            }
        };

        fetchStats();
    }, []);

    console.log('Estatísticas no estado:', stats); // Adicionado para debug

    const handleSearchByValue = async () => {
        try {
            const response = await fetch(`http://localhost:3001/findByValue/${value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const result = await response.json();
                setPage(result.values.page);
                console.log('Dados recebidos:', result);
            } else {
                console.error('Erro ao enviar solicitação:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao enviar solicitação:', error);
        }
    };

    return (
        <div className="container">
            <Statistics numberOfColisions={stats.numberOfColisions} numberOfOverflows={stats.numberOfOverflows} />

            <h1 className="TituloForm">Pesquisa na base de dados</h1>
            <Label descricao="Escolha um elemento da base para ser pesquisado" />
            <Input texto=" Insira o elemento para pesquisa" value={value}
                onChange={(e) => setValue(e.target.value)} />
            <div className="BotaoPagina">
                <Button label="Pesquisar" onClick={handleSearchByValue} />
            </div>
            {page && <Table data={page.data} />} {/* Assumindo que a página tem uma propriedade 'data' */}
        </div>
    );
}

export default SecondPage;
