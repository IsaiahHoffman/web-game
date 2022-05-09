if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

let IP = "10.141.112.150"

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const req = require('express/lib/request')
const bodyParser = require('body-parser')
const path = require('path')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout/home');
app.use(expressLayouts)
app.use(bodyParser.urlencoded({limit:'10mb', extended: false}))
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DATABASE_URL
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log("Mongodb connected")
  client.close();
});

app.use(express.static(path.join(__dirname, 'public')));


const homeRouter = require("./routes/home.js")
app.use('/', homeRouter)


app.listen(process.env.PORT || 3000)