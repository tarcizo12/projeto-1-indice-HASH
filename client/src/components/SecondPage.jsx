import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Input from './Input';
import Label from './Label';
import Table from './Table';
import '../index.css';
import Statistics from './Statistics';

//receber um objeto de página
//objeto vai conter as tuplas
//cada tupla e composta de dois atributos: line e valueOfData

function SecondPage() {
  const [value, setValue] = useState(''); // Defina o valor desejado
  const [page, setPage] = useState();
  const [pageNumber, setPageNumber] = useState();
  const navigate = useNavigate();

  const [stats, setStats] = useState({ collisionsRate: 0, overflowRate: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:3000/statics');
        const data = await response.json();

        console.log('Dados recebidos:', data); // Adicionado para debug
        setStats({
          collisionsRate: data.values.overflowRate,
          overflowRate: data.values.collisionsRate,
        });
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      }
    };

    fetchStats();
  }, []);

  const handleBackPage = async () => {
    await fetch('http://localhost:3000/reset', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        const result = await response.json();
        const resposta = result.values.reset;

        if (resposta) {
          navigate('/');
        } else {
          console.error('Erro ao enviar solicitação:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Erro na requisição:', error);
      });
  };

  const handleSearchByValue = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/findByValue/${value}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        const pageNumber = result.values.numberPageOfValue;
        setPageNumber(pageNumber);
      } else {
        console.error('Erro ao enviar solicitação:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const handleSearchByTableScan = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tableScan/${value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // if (response.ok) {
      //   const result = await response.json();
      //   const pageNumber = result.values.numberPageOfValue;
      //   setPageNumber(pageNumber);
      // } else {
      //   console.error('Erro ao enviar solicitação:', response.statusText);
      // }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <div className="container">
      <Statistics
        numberOfCollisions={stats.collisionsRate}
        numberOfOverflows={stats.overflowRate}
      />
      <h1 className="TituloForm">Pesquisa na base de dados</h1>
      <Label description="Escolha um elemento da base para ser pesquisado" />
      {pageNumber !== undefined && (
        <Label description={'Valor esta localizado na pagina: ' + pageNumber} />
      )}
      <Input texto="Insira o valor" value={value} onChange={setValue} />
      <div className="PageButtons">
        <Button label="Voltar" onClick={handleBackPage} />
        <Button label="Pesquisar com Índice" onClick={handleSearchByValue} />
        <Button
          label="Pesquisar com Table Scan"
          onClick={handleSearchByTableScan}
        />
      </div>
      {page && <Table data={page.tuples} />}{' '}
      {/* Assumindo que a página tem uma propriedade 'data' */}
    </div>
  );
}

export default SecondPage;
