import { TupleService } from './TupleService';
import { Table } from '../model/Table';

export class TableService {
  private tupleService: TupleService = new TupleService();

  getTableOfTXT(): Table {
    const table: Table = new Table(this.tupleService.getValuesTxt());

    return table;
  }
}
