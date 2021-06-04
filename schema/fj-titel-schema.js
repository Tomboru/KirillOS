const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
}

const fjtitelschema = mongoose.Schema({
    _id: reqString,
    text: reqString,
})

module.exports = mongoose.model('fj-titel-schema', fjtitelschema)