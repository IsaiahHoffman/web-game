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
router.get('/', async (req, res) => {
    console.log('Someone Logged On')
    try {
        const users = await userInfo.find({})
        let stringUsers = "Users: "
        for (let i = 0; i < users.length; i++){
            if (i == users.length-1){
                stringUsers = stringUsers + users[i].username
                break
            }
            stringUsers = stringUsers + users[i].username + ", "
        }
        res.render('layout/index', { text: stringUsers })
    } catch {
        
    } 
})

router.get('/CreateAccount', (req, res) => {
    res.render('layout/createAccount.ejs', { userInfo: new userInfo() })
})

router.post('/CreateAccount', async (req, res) => {
    console.log(req.body.userName)
    const user = new userInfo({
        username: req.body.userName,
        password: req.body.password,
        position: new Player(50, 50)
    })
    try {
        await user.save()
        res.redirect('/')
    } catch (error) {
        console.log(error)
        res.render('errorCreateAccount')
    }
})


module.exports = router


