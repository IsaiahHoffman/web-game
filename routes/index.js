const express = require("express")
const req = require("express/lib/request")
const { default: mongoose } = require("mongoose")
const Player = require("../models/player")
const router = express.Router()
const movement = require('../models/player')
const userInfo = require("../models/userInfo")

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
mongoose.connect(process.env.DATABASE_URL)

let a = new Player(10, 10)
let pos = a.position()
router.get('/', (req, res) => {
    res.render('index', { text: pos })
})

router.get('/CreateAccount', (req, res) => {
    res.render('createAccount.ejs', { userInfo: new userInfo() })
})

router.post('/CreateAccount', async (req, res) => {
    console.log(req.body.userName)
    const user = new userInfo({
        username: req.body.userName,
        password: req.body.password
    })
    try {
        await user.save()
        res.render('index')
    } catch (error) {
        console.log(error)
        res.render('errorCreateAccount')
    }
})


module.exports = router


