//Tabela: contém todas as tuplas construídas a partir do carregamento do arquivo de dados.
import { BaseClass } from '../utils/BaseClass';
import { Tuple } from './Tuple';

export class Table extends BaseClass {
  constructor(private tuples: Tuple[]) {
    super();
  }

  getListOfTuples(): Tuple[] {
    return this.tuples;
  }

  setListOfTuples(list: Tuple[]): void {
    this.tuples = list;
  }
}
