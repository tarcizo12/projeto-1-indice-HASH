import express from 'express';
import cors from 'cors';
import { TableService } from './service/TableService';
import { Table } from './model/Table';
import { MainService } from './service/MainService';
import { Page } from './model/Page';
import { StatisticsService } from './service/StaticsService';

class App {
  private app: express.Application;
  private tableService: TableService;
  private statisticsService: StatisticsService;
  private mainService: MainService;
  private table: Table;
  private readonly BUCKET_SIZE: number = 100;

  constructor() {
    this.tableService = new TableService();
    this.mainService = new MainService();
    this.table = this.tableService.getTableOfTXT();
    this.statisticsService = new StatisticsService();
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    const corsOptions = {
      origin: 'http://localhost:4000',
      optionsSuccessStatus: 200,
    };

    this.app.use(cors(corsOptions));
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    this.app.post('/loadData', (req, res) => {
      const pageSize: number = Number(req.body.pageSize);
      console.log(req.body);
      const bucketSize: number = this.BUCKET_SIZE;

      this.mainService.handleCreationPagesWithBuckets(
        bucketSize,
        pageSize,
        this.table
      );

      console.log('LOAD DE DADOS OK');

      return res.json({
        values: {
          bucketSize,
          pageSize,
        },
      });
    });

    //Estatísticas
    this.app.get('/statics', (req, res) => {
      // Ainda fazendo
      this.statisticsService.calculateStatics(
        this.mainService.getAllBucketsCreated()
      );
      
     
        //Passa 4
      const currentValueOfOverflowRate: number =
        this.statisticsService.calculateOverflowRate(
          this.mainService.getAllBucketsCreated().length
        );

      const currentValueOfCollisionsRate: number =
        this.statisticsService.calculateCollisionRate(
          this.table.getListOfTuples().length
        );

      return res.json({
        values: {
          overflowRate: Number((currentValueOfOverflowRate * 100).toFixed(2)),
          collisionsRate: Number((currentValueOfCollisionsRate * 100).toFixed(2)),
          numberOfOverflows: this.statisticsService.getStaticsOfLoad().getNumberOfOverflows(),
          numberOfColisions: this.statisticsService.getStaticsOfLoad().getNumberOfCollisions()

        },
      });
    });

    //Pesquisa por valor
    this.app.get('/findByValue/:value', (req, res) => {
      const value: string = req.params.value;

      const pageNumber: number = this.mainService.getPageByValue(value);

      return res.json({
        values: {
          numberPageOfValue: pageNumber,
          value: value,
        },
      });
    });

    //Pesquisa pagina por id da pagina
    this.app.get('/page/:pageIndex', (req, res) => {
      const pageId: number = Number(req.params.pageIndex);

      const page: Page = this.mainService.getPageById(pageId);

      return res.json({
        values: { page: page },
      });
    });

    //Pesquisa por table scan
    this.app.get('/tableScan/:value', (req, res) => {
      const value: string = req.params.value;

      const visitedPages = this.mainService.getPagesVisitedByTableScan(value);

      return res.json({
        values: { visitedPages: visitedPages },
      });
    });

    this.app.get('/reset', (req, res) => {
      this.mainService.reset();
      return res.json({
        values: {
          reset: true,
        },
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
