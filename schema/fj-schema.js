const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
}

const fjSchema = mongoose.Schema({
    _id: reqString,
    titel: reqString,
    color: reqString,
    description: reqString,
    toggle1: Boolean,
})

module.exports = mongoose.model('fjs', fjSchema)