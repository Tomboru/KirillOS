const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
}

const welcomeFriendSchema = mongoose.Schema({
    _id: reqString,
    channelId: reqString,
    text: reqString,
})

module.exports = mongoose.model('welcome-friend-channels', welcomeFriendSchema)