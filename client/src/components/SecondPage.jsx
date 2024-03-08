import React from 'react';
import { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';
import Label from './Label';
import Table from './Table';
import '../index.css';
import Statistics from './Statistics';
import { Actions } from '../data/actions';
import { useNavigate } from 'react-router-dom';

//receber um objeto de página
//objeto vai conter as tuplas
//cada tupla e composta de dois atributos: line e valueOfData

function SecondPage() {
  const [value, setValue] = useState('');
  const [page, setPage] = useState();
  const [pageNumber, setPageNumber] = useState();
  const [visitedPages, setVisitedPages] = useState();
  const [stats, setStats] = useState({ collisionsRate: 0, overflowRate: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await Actions.getStatics();

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

  useEffect(() => {
    if (pageNumber != undefined) {
      const response = Actions.getPage(pageNumber).then((response) => {
        console.log('Pagina -> ', response);
      });
    }
  }, [pageNumber]);

  const handleBackPage = async () => {
    const response = await Actions.setResetLoad();

    if (response) {
      navigate('/');
    }
  };

  const handleSearchByValue = async () => {
    try {
      const response = await Actions.getByValueWithBucketSearch(value);

      setPageNumber(response);
    } catch (error) {
      console.error('Erro ao buscar com bucket:', error);
    }
  };

  const handleSearchByTableScan = async () => {
    try {
      const response = await Actions.getByValueWithTableScanSearch(value);

      setVisitedPages(response);
    } catch (error) {
      console.error('Erro ao buscar com table scan:', error);
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
      {visitedPages !== undefined && (
        <Label
          description={
            'A quantidade de paginas percorridas na consulta: ' + visitedPages
          }
        />
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
    </div>
  );
}

export default SecondPage;
