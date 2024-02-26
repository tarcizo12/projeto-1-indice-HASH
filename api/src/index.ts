import * as express from 'express';
import { TableService } from './service/TableService';
import { Table } from './model/Table';

class App {
  private app: express.Application;
  private tableService: TableService;
  private table: Table;

  constructor() {
    this.app = express();
    this.tableService = new TableService();
    this.setupRoutes();
    this.table = this.tableService.getTableOfTXT();
  }

  private setupRoutes(): void {
    this.app.get('/', (req, res) => {
      return res.json({
        status: 'success!!!!!',
      });
    });

    this.app.get('/table', (req, res) => {
      return res.json({
        status: 'Dados de tabela',
        currentClass: this.table.getClassName(),
        values: this.table,
      });
    });

    this.app.get('/table/:value', (req, res) => {
      const value = req.params.value;

      return res.json({
        status: 'Dados de tabela',
        currentClass: this.table.getClassName(),
        values: this.table.getListOfTuples()[value],
      });
    });
  }

  public start(port: number): void {
    this.app.listen(port, () => console.log(`listening on port ${port}`));
  }
}

const app: App = new App();
const port: number = 3000;
app.start(port);
