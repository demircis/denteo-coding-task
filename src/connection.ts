import { Db, MongoClient, ServerApiVersion } from "mongodb";

const uri: any = process.env.DB_URI;
const weeklyAppointments = [
    { from: "2021-01-04T10:15:00", to: "2021-01-04T10:30:00" },
    { from: "2021-01-05T11:00:00", to: "2021-01-05T11:30:00" },
    { from: "2021-01-05T15:30:00", to: "2021-01-05T16:30:00" },
    { from: "2021-01-06T10:00:00", to: "2021-01-06T10:30:00" },
    { from: "2021-01-06T11:00:00", to: "2021-01-06T12:30:00" },
    { from: "2021-01-06T17:30:00", to: "2021-01-06T18:00:00" },
  ];

const options = { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }

const client = new MongoClient(uri, options);

export default class DbConnection {

    dbConnection: Db | undefined;

    constructor() {
        this.connectToDatabase()
        this.createCollection()
        this.fillExistingAppointments()
    }

    connectToDatabase() {
        client.connect(err => {
            this.dbConnection = client.db("mydb");
            console.log("Database connected!");
        })
    }
    
    createCollection() {
        if (this.dbConnection)
        this.dbConnection.createCollection("appointments", function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
        });
    }
    
    fillExistingAppointments() {
        if (this.dbConnection)
        this.dbConnection.collection("appointments").insertMany(weeklyAppointments, function(err, res) {
            if (err) throw err;
            if (res) console.log("Number of documents inserted: " + res.insertedCount);
        });
    }
    
    getDb() {
        return this.dbConnection;
    }
}

