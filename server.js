if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const req = require('express/lib/request')

// app.get('/', (req, res) => {
//     res.send("hello world")
// })

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const url = require('./lock')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = url
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log("Mongodb connected")
  client.close();
});



const indexRouter = require("./routes/index")
app.use('/', indexRouter)


app.listen(process.env.PORT || 3000)