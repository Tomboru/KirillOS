const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
}

const selfroleSchema = mongoose.Schema({
    _id: reqString,
    channelId: reqString,
})

module.exports = mongoose.model('selfrole-channels', selfroleSchema)