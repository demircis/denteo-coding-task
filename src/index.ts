import 'dotenv/config';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
});

const port = process.env.BACKEND_PORT;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})