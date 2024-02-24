import * as express from "express"
import { TableService } from "./service/TableService";
import { Table } from "./model/Table";

class App {
    private app: express.Application;
    private tableService: TableService;

    constructor() {
        this.app = express();
        this.tableService = new TableService();
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.app.get('/', (req, res) => {
            return res.json({
                status: "success!!!!!",
            });
        });

        this.app.get('/table', (req, res) => {
            const table: Table = this.tableService.getTableOfTXT();
            return res.json({
                status: "Dados de tabela",
                currentClass: table.getClassName(),
                values: table
            });
        });

        this.app.get('/table/:value', (req, res) => {
            const value = req.params.value;
            const table: Table = this.tableService.getTableOfTXT();
            
            return res.json({
                status: "Dados de tabela",
                currentClass: table.getClassName(),
                values: table.getListOfTuples()[value],
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