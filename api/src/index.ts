import * as express from 'express';
import { TableService } from './service/TableService';
import { Table } from './model/Table';
import { MainService } from './service/MainService';
import { Page } from './model/Page';
import { StatisticsService } from './service/StaticsService';
import { Statistics } from 'model/Statistics';

class App {
  private app: express.Application;
  private tableService: TableService;
  private statiticsService: StatisticsService;
  private mainService: MainService;
  private table: Table;
  private readonly BUCKET_SIZE: number = 2;

  constructor() {
    this.tableService = new TableService();
    this.mainService = new MainService();
    this.table = this.tableService.getTableOfTXT();
    this.statiticsService = new StatisticsService();
    this.app = express();
    this.setupRoutes();
  }

  private setupRoutes(): void {

    //Load de dados
    this.app.get('/loadData/:pageSize/', (req, res) => {
      const pageSize: number = Number(req.params.pageSize);
      const bucketSize: number = this.BUCKET_SIZE;

      this.mainService.handleCreationPagesWithBuckets(
        bucketSize,
        pageSize,
        this.table
      )

      return res.json({
        values: {
          bucketSize,
          pageSize
        },
      })});

    //Pesquisa por valor
    this.app.get('/statics', (req,res) => {

      // Ainda fazendo
      this.statiticsService.calculateStatics(
        this.mainService.getAllBucketsCreateds()
      )
      
      const statics: Statistics = this.statiticsService.getStaticsOfLoad();

      return res.json({
        values: {
          statics: statics,
        }
      })
    })


    
    //Pesquisa por valor
    this.app.get('/findByValue/:value', (req,res) => {
      const value: string = req.params.value;

      const pageNumber = this.mainService.getPageByValue(value);

      return res.json({
        values: {
          numberPageOfValue: pageNumber,
          value: value
        }
      })
    })

    //Pesquisa pagina por id da pagina
    this.app.get('/page/:pageIndex', (req,res) => {
      const pageId: number = Number(req.params.pageIndex);

      const page: Page = this.mainService.getPageById(pageId);
      
      return res.json({
        values: {
          page: page
        }
      })

    })

  };

  public start(port: number): void {
    this.app.listen(port, () => console.log(`listening on port ${port}`));
  }
}

const app: App = new App();
const port: number = 3000;
app.start(port);
