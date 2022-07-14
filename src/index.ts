import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Routes from './routes';
import {connectToDatabase, createCollection, fillExistingAppointments} from './connection';

const app = express();
app.use(cors());
app.use(express.json());
app.use('./appointments', Routes);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

connectToDatabase();
createCollection();
fillExistingAppointments();

const port = process.env.BACKEND_PORT;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})