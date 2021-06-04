const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
}

const fjcolorschema = mongoose.Schema({
    _id: reqString,
    text: reqString,
})

module.exports = mongoose.model('fj-color-schema', fjcolorschema)