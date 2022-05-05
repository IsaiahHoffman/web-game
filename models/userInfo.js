const mongoose = require('mongoose')

const userInfo = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('userInfo', userInfo)