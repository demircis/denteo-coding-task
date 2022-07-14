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

export default class DbUtil {
    private static instance: DbUtil;
    dbo: Db | undefined;

    private constructor() {}

    static getInstance() {
        if (!DbUtil.instance) {
            DbUtil.instance = new DbUtil();
        }
        return DbUtil.instance;
    }

    async connectToDatabase() {
        await client.connect();
        console.log("Database connected!");
        this.dbo = client.db("test");
    }

    createCollection() {
        if (this.dbo && !this.dbo.collection("appointments")) {
            this.dbo.createCollection("appointments", function(err, res) {
                if (err) throw err;
                console.log("Collection created!");
            });
        }
    }

    async fillExistingAppointments() {
        if (this.dbo && this.dbo.collection("appointments") && (await this.dbo.collection("appointments").countDocuments()) == 0) {
            this.dbo.collection("appointments").insertMany(weeklyAppointments, function(err, res) {
                if (err) throw err;
                if (res) console.log("Number of documents inserted: " + res.insertedCount);
            });
        }
    }

    getDb() {
        return this.dbo;
    }
}
