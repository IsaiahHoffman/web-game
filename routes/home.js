const express = require("express")
const req = require("express/lib/request")
const { default: mongoose } = require("mongoose")
const userInfo = require("../models/userInfo")
const Player = require('../models/player')
mongoose.connect(process.env.DATABASE_URL)
const router = express.Router()
let IP = "10.141.112.150"

currentUser = null
if (currentUser !== null) {
    router.get('/layout', async (req, res) => {
        res.render('layout');
    })
}

router.post('/data', async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body))
    let users = await userInfo.find({})
          for (let i = 0; i < users.length; i++) {
              if (users[i].username == data.username) {
                  users[i].position.deltaX
                  users[i].position.deltaY
                  await users[i].save()
              }
          }
    
  })

// Create Account page
router.use((req, res, next) => {
    req.app.set('layout', 'home/homeC');
    next();
});
router.get('/', (req, res) => {
    res.render('layout');
});
router.get('/CreateAccount', async (req, res) => {
    res.render('layout');
})

router.use((req, res, next) => {
    req.app.set('layout', 'home/homeL');
    next();
});

router.get('/Login', async (req, res) => {
    res.render('layout');
})

router.use((req, res, next) => {
    req.app.set('layout', 'layout');
    next();
});

router.post('/Login', async (req, res) => {
    try {
        let users = await userInfo.find({})
        for (let i = 0; i < users.length; i++) {
            if (users[i].username == req.body.userNameL && users[i].password == req.body.passwordL) {
                currentUser = await users[i]
                break
            }
        }
        if (await currentUser !== null) {
            res.render('layout', { text: await currentUser.username, data: users })
        } else {
            throw "Username does not exist"
        }
    } catch (error) {
        console.log(error)
        res.redirect('/Login')
    }
})

router.post('/CreateAccount', async (req, res) => {
    try {
        let users = await userInfo.find({})
        for (let i = 0; i < users.length; i++) {
            if (users[i].username == req.body.userNameC) {
                throw "Username in use"
            }
        }
        const user = new userInfo({
            username: req.body.userNameC,
            password: req.body.passwordC,
            position: new Player(50, 50)
        })
        await user.save()
        currentUser = user
        res.render('layout', { text: await user.username })
    } catch (error) {
        console.log(error)
        res.redirect('/CreateAccount')
    }
})


module.exports = router