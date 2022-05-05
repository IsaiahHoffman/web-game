const express = require("express")
const req = require("express/lib/request")
const { default: mongoose } = require("mongoose")
const Player = require("../models/player")
const router = express.Router()
const movement = require('../models/player')
const userInfo = require("../models/userInfo")

let a = new Player(10, 10)
let pos = a.position()
router.get('/', (req, res) => {
    res.render('index', { text: pos })
})

router.get('/CreateAccount', (req, res) => {
    res.render('createAccount.ejs', {userInfo: new userInfo()})
})

router.post('/CreateAccount', async (req, res) => {
    console.log(req.body.userName)
    const user = new userInfo({
        username: req.body.userName,
        password: req.body.password
    })
    try {
        const newUser = await user.save()
        res.render('index')
    } catch (error) {
        console.log(error)
        res.render('errorCreateAccount')
    }
})


module.exports = router


