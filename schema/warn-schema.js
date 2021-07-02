const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
}

const reqObject = {
    type: [Object],
    required: true,
}

const warnSchema = mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    warnings: reqObject,
})

module.exports = mongoose.model('warnings', warnSchema)