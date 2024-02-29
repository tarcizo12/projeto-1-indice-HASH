import * as express from 'express';
import { TableService } from './service/TableService';
import { Table } from './model/Table';
import { PageService } from './service/PageService';
import { Page } from 'model/Page';

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
        const pages: Page[] = this.pageService.getPagination(Number(value), this.table);

        return res.json({
          status: 'Paginas',
          currentClass: pages[0].getClassName(),
          values: pages,
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
