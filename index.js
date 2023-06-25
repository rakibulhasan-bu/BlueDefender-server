const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://blueDefender:lngstOGDAM5WqbDh@cluster0.oz0lbz6.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const dbConnect = async () => {
    try {
        client.connect();
        console.log("Database Connected Successfully✅");

    } catch (error) {
        console.log(error.name, error.message);
    }
}
dbConnect()

const productCollection = client.db("blueDefender").collection("products")
const ordersCollection = client.db("blueDefender").collection("orders")


app.get('/products', async (req, res) => {
    const result = await productCollection.find({}).toArray()
    res.send(result);
})
app.put('/orders', async (req, res) => {
    const data = req.body;
    const result = await ordersCollection.insertOne(data);
    res.send(result);
})
app.get('/orders', async (req, res) => {
    const result = await ordersCollection.find({}).toArray()
    res.send(result);
})
app.get('/expressOrders', async (req, res) => {
    const result = await ordersCollection.find({ status: "Express Delivery" }).toArray()
    res.send(result);
})
app.get('/regularOrders', async (req, res) => {
    const result = await ordersCollection.find({ status: "Regular Delivery" }).toArray()
    res.send(result);
})
app.get('/', (req, res) => {
    res.send('BlueDefender is running')
})

app.listen(port, () => {
    console.log(`BlueDefender is running on port ${port}`);
})