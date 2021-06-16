const mongo = require('../function/mongo')
const command = require('./command')
const german = require('../languages/german.json')
const extra = require('../languages/extra.json')
const english = require('../languages/english.json')
const welcomeFriendSchema = require('../schema/welcome-friend-schema')
const friendRoleSchema = require('../schema/friend-role-schema')

module.exports = (bot) => {

    const cache1 = {}
    const cache2 = {}

    command(bot, 'setfriendwelcome', async (message) => {
        const { member, channel, content, guild } = message

        if (!member.hasPermission('ADMINISTRATOR')) {
            channel.send(`${english.not_allowed}`)
            return
        }

        let text = content

        const split = text.split(' ')

        if (split.length < 2) {
            channel.send('Please provide a welcome message')
            return
        }

        split.shift()
        text = split.join(' ')

        //Cache

        cache1[guild.id] = [channel.id, text]
        cache2[guild.id] = []

        await mongo().then(async (mongoose) => {
            try {
               await welcomeFriendSchema.findOneAndUpdate({
                   _id: guild.id
               }, {
                    _id: guild.id,
                    channelId: channel.id,
                    text: text,
               }, {
                   upsert: true
               })
            } finally {
            }
        })
        
        channel.send('Friend welcome channel successfully set')
        
    })

    bot.on('guildMemberUpdate', async member => {
        const { guild } = member
        var result = null
        var role = null

        //Search cache from Guild.id
        let data = cache1[guild.id]
        let data2 = cache2[guild.id]

        if (!data || data2) {
            console.log('FETCHING FROM DATABASE')
            
            await mongo().then(async (mongoose) => {
                try {
                    result = await welcomeFriendSchema.findOne({ _id: guild.id })
                    role = await friendRoleSchema.findOne({ _id: guild.id })

                    if(result != null && role != null){

                    cache1[guild.id] = data = [result.channelId, result.text]
                    cache2[guild.id] = data2 = [role.roleId]
                }
                } finally {
                }
            })
        
        }

        if(result != null && role != null){

        const channelId = data[0]
        const text = data[1]
        const friendrole = data2[0]

        const channel = guild.channels.cache.get(channelId)
        if (member.roles.cache.has(`${friendrole}`)) {

        channel.send(text.replace(/<@>/g, `<@${member.id}>`).replace(/<§>/g, `${guild.name}`))
         }
        }
    })
}