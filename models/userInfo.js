const mongoose = require('mongoose')
const Player = require('../models/Player')

const userInfo = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    position: {
        type: Object,
        required: true
    }
})

module.exports = mongoose.model('userInfo', userInfo)