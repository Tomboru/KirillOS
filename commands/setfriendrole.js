const mongo = require('../function/mongo')
const command = require('./command')
const german = require('../languages/german.json')
const extra = require('../languages/extra.json')
const english = require('../languages/english.json')
const friendRoleSchema = require('../schema/friend-role-schema')

module.exports = (bot) => {

    const cache = {}

    command(bot, 'setfriendrole', async (message) => {
        const { member, channel, content, guild } = message

        if (!member.hasPermission('ADMINISTRATOR')) {
            channel.send(`${english.not_allowed}`)
            return
        }

        let text = content.replaceAll("<", "").replaceAll("@", "").replaceAll("&", "").replaceAll(">", "")

        const split = text.split(' ')

        if (split.length < 1) {
            channel.send('Please ping a role || or write the roleID')
            return
        }

        if (split.length > 2) {
            channel.send('Please ping a role || or write the roleID')
            return
        }

        split.shift()
        text = split.join(' ')

        if (!message.guild.roles.cache.find(role => role.id == (text))){
            channel.send('Please provide a existing role || or write the roleID')
            return
        }

        cache[guild.id] = [text]

        await mongo().then(async (mongoose) => {
            try {
               await friendRoleSchema.findOneAndUpdate({
                   _id: guild.id
               }, {
                    _id: guild.id,
                    roleId: text
               }, {
                   upsert: true
               })
            } finally {
                mongoose.connection.close()
            }
        })

        channel.send('Friend role successfully set')

    })

}