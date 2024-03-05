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

    const [stats, setStats] = useState({ collisionsRate: 0, overflowRate: 0 });
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:3000/statics');
                const data = await response.json();

                console.log('Dados recebidos:', data); // Adicionado para debug
                setStats({
                    collisionsRate: data.values.overflowRate, 
                    overflowRate: data.values.collisionsRate
                });
            } catch (error) {
                console.error('Erro ao buscar estatísticas:', error);
            }
        };

        fetchStats();
    }, []);

    console.log('Estatísticas no estado:', stats); // Adicionado para debug

    const handleSearchByValue = async () => {
        try {
            const response = await fetch(`http://localhost:3000/findByValue/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value }),
            });

            if (response.ok) {
                const result = await response.json();
                setPage(result.values.page);
            } else {
                console.error('Erro ao enviar solicitação:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao enviar solicitação:', error);
        }
    };

    return (
        <div className="container">
        <Statistics numberOfColisions={stats.collisionsRate} numberOfOverflows={stats.overflowRate} />

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
