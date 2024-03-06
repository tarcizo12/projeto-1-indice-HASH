import express from 'express';
import cors from 'cors';
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
      
      const bucketSize: number = this.BUCKET_SIZE;
  
      this.mainService.handleCreationPagesWithBuckets(
          bucketSize,
          pageSize,
          this.table
      );
      
      console.log("LOAD DE DADOS OK")

      return res.json({
          values: {
              bucketSize,
              pageSize
          },
      });
    });
  

    //Estatisticas
    this.app.get('/statics', (req,res) => {

      // Ainda fazendo
      this.statiticsService.calculateStatics( this.mainService.getAllBucketsCreateds() );
      
      const currentValueOfOverflowRate: number = this.statiticsService.calculateOverflowRate(
        this.mainService.getAllBucketsCreateds().length
      );

      const currentValueOfCollisionsRate: number = this.statiticsService.calculateCollisionRate(
        this.table.getListOfTuples().length
      );

      return res.json({
        values: {
          overflowRate: Number((currentValueOfOverflowRate*100).toFixed(2)),
          collisionsRate: Number((currentValueOfCollisionsRate*100).toFixed(2)),
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

  }

  public start(port: number): void {
    this.app.listen(port, () => console.log(`listening on port ${port}`));
  }
}

const app: App = new App();
const port: number = 3000;
app.start(port);
