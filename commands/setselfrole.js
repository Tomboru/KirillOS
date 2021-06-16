const mongo = require('../function/mongo')
const command = require('./command')
const english = require('../languages/english.json')
const selfrole = require('../schema/selfrole-schema')

module.exports = (bot) => {

    //This is the cache
    const cache = {}

    command(bot, 'setselfrole', async (message) => {
        const { member, channel, content, guild } = message

        if (!member.hasPermission('ADMINISTRATOR')) {
            channel.send(`${english.not_allowed}`)
            return
        }

        cache[guild.id] = [channel.id]

        await mongo().then(async (mongoose) => {
            try {
               await selfrole.findOneAndUpdate({
                   _id: guild.id
               }, {
                    _id: guild.id,
                    channelId: channel.id,
               }, {
                   upsert: true
               })
            } finally {
            }
        })

        channel.send('Selfrole successfully set')
    })
}