import * as express from "express"
const app = express()

app.get('/', (req, res) => {
    return res.json({
        status: "success!!!!!",
    });
});

app.listen(3000, () => console.log("listening on port 3000"))