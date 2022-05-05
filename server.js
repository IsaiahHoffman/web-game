// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config()
// }

// const express = require('express')
// const app = express()
// const expressLayouts = require('express-ejs-layouts')
// const req = require('express/lib/request')

app.get('/', (req, res) => {
    res.send("hello world")
})

// app.set('view engine', 'ejs')
// app.set('views', __dirname + '/views')
// app.set('layout', 'layouts/layout')
// app.use(expressLayouts)
// app.use(express.static('public'))

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://idhoffman:IHbren0818!!@cluster0.2ijbu.mongodb.net/trial2?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log("Mongodb connected")
//   client.close();
// });


// const mongoose = require('mongoose')
// mongoose.connect(process.env.DATABASE_URL)
// const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', () => console.log('Connected to Mongoose'))

// const indexRouter = require("./routes/index")
// app.use('/', indexRouter)


app.listen(process.env.PORT || 3000)