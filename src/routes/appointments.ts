import express, { Router } from 'express';
import DbUtil from '../connection';

const appointmentRoutes: Router = express.Router();

appointmentRoutes.route("/api/appointments").get(async function (req, res) {
    const dbConnect = DbUtil.getInstance().getDb();
    
    if (dbConnect) {
        dbConnect
        .collection("appointments")
        .find({})
        .toArray(function (err: any, result: any) {
            if (err) {
            res.status(400).send("Error fetching appointments!");
            } else {
            res.json(result);
            }
        });
    }
    });


appointmentRoutes.route("/api/appointments/add").post(function (req, res) {
    const dbConnect = DbUtil.getInstance().getDb();
    const appointmentDocument = {
        from: req.body.from,
        to: req.body.to
    };

    if (dbConnect) {
        dbConnect
        .collection("appointments")
        .insertOne(appointmentDocument, function (err: any, result: any) {
            if (err) {
                res.status(400).send("Error inserting appointment!");
            } else {
                if (result) console.log(`Added a new appointment with id ${result.insertedId}`);
                res.status(204).send();
            }
        });
    }
});

export default appointmentRoutes;
