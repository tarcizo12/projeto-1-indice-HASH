import * as express from 'express';
import { TableService } from './service/TableService';
import { Table } from './model/Table';
import { MainService } from './service/MainService';
import { Page } from './model/Page';


class App {
  private app: express.Application;
  private tableService: TableService;
  private mainService: MainService;
  private table: Table;

  constructor() {
    this.tableService = new TableService();
    this.mainService = new MainService();
    this.table = this.tableService.getTableOfTXT();
    this.app = express();
    this.setupRoutes();
  }

  private setupRoutes(): void {

    //Divisao de paginas
    this.app.get('/bucket/:divisionPage/:bucketSize', (req, res) => {
      const divisionPage: number = Number(req.params.divisionPage);
      const bucketSize: number = Number(req.params.bucketSize);

      this.mainService.handleCreationPagesWithBuckets(
        bucketSize,
        divisionPage,
        this.table
      )

      return res.json({
        status: 'main',
        currentClass: "TODO",
        values: {
          divisionPage,
          bucketSize
        },

      })});
  };

  public start(port: number): void {
    this.app.listen(port, () => console.log(`listening on port ${port}`));
  }
}

const app: App = new App();
const port: number = 3000;
app.start(port);
