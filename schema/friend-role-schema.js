const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
}

const friendRoleSchema = mongoose.Schema({
    _id: reqString,
    roleId: reqString,
})

module.exports = mongoose.model('friend-role', friendRoleSchema)