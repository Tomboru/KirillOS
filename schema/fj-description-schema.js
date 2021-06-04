const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
}

const fjdescriptionschema = mongoose.Schema({
    _id: reqString,
    text: reqString,
})

module.exports = mongoose.model('fj-description-schema', fjdescriptionschema)