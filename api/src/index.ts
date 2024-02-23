import * as express from "express"
const app = express()

const port = 3000

app.get('/', (req, res) => {
    return res.json({
        status: "success!!!!!",
    });
});

app.listen(port, () => console.log(`listening on port ${port}`))
