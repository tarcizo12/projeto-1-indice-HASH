import * as express from "express"
import { WordData } from "./model/WordData";
import { WordDataService } from "./service/WordDataService";

const app = express()
const wordsDataService: WordDataService = new WordDataService();
const wordsTxt: WordData[] = wordsDataService.getValuesTxt();

const port = 3000

app.get('/', (req, res) => {
    return res.json({
        status: "success!!!!!",
    });
});

app.get('/valuesOfTxt', (req, res) => {
    return res.json({
        status: "success!!!!!",
        values: wordsTxt
    });
});


app.listen(port, () => console.log(`listening on port ${port}`))
