import * as express from 'express';
import { TableService } from './service/TableService';
import { Table } from './model/Table';
import { PageService } from './service/PageService';

class App {
  private app: express.Application;
  private tableService: TableService;
  private pageService: PageService;
  private table: Table;

  constructor() {
    this.app = express();
    this.tableService = new TableService();
    this.pageService = new PageService();
    this.setupRoutes();
    this.table = this.tableService.getTableOfTXT();
  }

  private setupRoutes(): void {

    //Rota total da tabela  
    this.app.get('/table', (req, res) => {
      return res.json({
        status: 'Dados de tabela',
        currentClass: this.table.getClassName(),
        values: this.table,
      });
    });

    //Indicie especifico da tablea
    this.app.get('/table/:value', (req, res) => {
      const value = req.params.value;

      return res.json({
        status: 'Dados de tabela',
        currentClass: this.table.getClassName(),
        values: this.table.getListOfTuples()[value],
      });
    });

    //Divisao de paginas
    this.app.get('/page/:sizeDivison', (req, res) => {
        const value: string = req.params.sizeDivison;
  
        return res.json({
          status: 'Paginas',
          currentClass: this.table.getClassName(),
          values: this.pageService.getPagination(Number(value), this.table),
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
