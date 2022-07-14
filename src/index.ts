import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import appointmentRoutes from './routes/appointments';
import DbUtil from './connection';

const app = express();
app.use(cors());
app.use(express.json());
app.use('./routes/appointments', appointmentRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

const port = process.env.BACKEND_PORT;

async function init() {
    const dbUtil = DbUtil.getInstance();
    await dbUtil.connectToDatabase();
    dbUtil.createCollection();
    dbUtil.fillExistingAppointments();
}

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`);
    await init();
})
