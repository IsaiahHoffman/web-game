if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const req = require('express/lib/request')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb', extended: false}))

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DATABASE_URL
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log("Mongodb connected")
  client.close();
});


const indexRouter = require("./routes/index")
app.use('/', indexRouter)


app.listen(process.env.PORT || 3000)