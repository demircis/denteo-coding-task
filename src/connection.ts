import { Db, MongoClient, ServerApiVersion } from "mongodb";

const uri: any = process.env.DB_URI;

const options = { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }

const client = new MongoClient(uri, options);

const weeklyAppointments = [
    { from: "2021-01-04T10:15:00", to: "2021-01-04T10:30:00" },
    { from: "2021-01-05T11:00:00", to: "2021-01-05T11:30:00" },
    { from: "2021-01-05T15:30:00", to: "2021-01-05T16:30:00" },
    { from: "2021-01-06T10:00:00", to: "2021-01-06T10:30:00" },
    { from: "2021-01-06T11:00:00", to: "2021-01-06T12:30:00" },
    { from: "2021-01-06T17:30:00", to: "2021-01-06T18:00:00" },
  ];

export function connectToDatabase() {
    let dbConnection: Db | undefined;
    client.connect(err => {
        if (err) throw err;
        console.log("Database connected!");
        dbConnection = client.db("test");
    })
    return dbConnection;
}

export function createCollection() {
    client.connect(err => {
        if (err) throw err;
        let dbConnection = client.db("test");
        console.log("Database connected!");
        dbConnection.createCollection("appointments", function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
        });
    });
}

export function fillExistingAppointments() {
    client.connect(err => {
        if (err) throw err;
        let dbConnection = client.db("test");
        dbConnection.collection("appointments").insertMany(weeklyAppointments, function(err, res) {
            if (err) throw err;
            if (res) console.log("Number of documents inserted: " + res.insertedCount);
        });
    })
}

