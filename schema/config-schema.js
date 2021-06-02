const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
}

const configSchema = mongoose.Schema({
    _id: reqString,
    prefix: reqString,
    avatar: reqString,
})

module.exports = mongoose.model('config', configSchema)

