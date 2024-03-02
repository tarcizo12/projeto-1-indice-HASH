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

const fetchDataFromBackend = async (url, setDataCallback) => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const jsonData = await response.json();
            setDataCallback(jsonData);
        } else {
            console.error("Erro ao buscar dados do backend");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
};

function SecondPage() {
    const [data, setData] = useState([]);
    const [numeroColisoes, setNumeroColisoes] = useState([]);
    const [numeroOverflows, setNumeroOverflows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Substitua 'sua_url_data' pela URL correta para cada chamada
            await fetchDataFromBackend("sua_url_data", setData);
            await fetchDataFromBackend("sua_url_colisoes", setNumeroColisoes);
            await fetchDataFromBackend("sua_url_overflows", setNumeroOverflows);
        };

        fetchData(); // Chama a função de busca de dados ao carregar a página
    }, []); // O segundo argumento vazio [] garante que o useEffect seja chamado apenas uma vez no carregamento inicial
    return (
        <div className="container">
                <Statistics colisoes={numeroColisoes} overflow={numeroOverflows}/>
                <h1 className="TituloForm">Pesquisa na base de dados</h1>
                <Label descricao="Escolha um elemento da base para ser pesquisado" />
                <Input texto=" Insira o elemento para pesquisa" />
                <div className="BotaoPagina">
                    <Button label="Pesquisar" />
                </div>
                <Table data={data} />
            </div>
    );
}

export default SecondPage;
