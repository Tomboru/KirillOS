const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
}

const giveawayRoleSchema = mongoose.Schema({
    _id: reqString,
    roleId: reqString,
})

module.exports = mongoose.model('giveaway-role', giveawayRoleSchema)