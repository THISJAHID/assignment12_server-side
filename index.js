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

run().catch(console.dir);









app.get('/', (req, res) => {
    res.send(" this is running from clint side server")
})

app.listen(port, () => {
    console.log(`my server is running ${port}`)
})
