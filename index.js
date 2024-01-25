const express = require('express');
const cors = require('cors');
const jwt = require("jsonwebtoken")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// require('dotenv').config();

// midleware 
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://jhrabbihero:EKIBm0M1zOAXUeOe@cluster0.2jg7710.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const database = client.db("gym")
        const all_users = database.collection("users")
        const subscribes = database.collection("subscribe")
        // const bidCollection = database.collection("bid")
        // const categoryCollections = database.collection("category")
        // const mycartCollections = database.collection("mycart")

        // app.post('/addjob', async (req, res) => {
        //     const product = req.body;

        //     const result = await all_jobCullection.insertOne(product)
        //     res.send(result)

        // })
        // app.post("/jwt", async (req, res) => {
        //     const user = req.body;
        //     const token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "1h" })
        //     res.send({token})
        // })

        app.post('/users', async (req, res) => {
            const users = req.body;

            const result = await all_users.insertOne(users)
            res.send(result)

        })
        app.post('/subscribes', async (req, res) => {
            const users = req.body;

            const result = await subscribes.insertOne(users)
            res.send(result)

        })

        app.get('/user/admin/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await all_users.findOne(query);
            let admin = false;
            if (user) {
                admin = user.role === 'admin';
                console.log(admin)
            }
            console.log(admin)
            res.send({ admin });
        });

        app.get('/user/trainer/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await all_users.findOne(query);
            let trainer = false;
            if (user) {
                trainer = user.role === 'trainer';
                console.log(trainer)
            }
            console.log(trainer)
            res.send({ trainer });
        });



        app.get('/users', async (req, res) => {


            const cursor = all_users.find()
            const result = await cursor.toArray();
            res.send(result)
        })












        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error

    }
}
run().catch(console.dir);









app.get('/', (req, res) => {
    res.send(" this is running from clint side server")
})

app.listen(port, () => {
    console.log(`my server is running ${port}`)
})
