const mongo = require('../function/mongo')
const command = require('./command')
const german = require('../languages/german.json')
const extra = require('../languages/extra.json')
const english = require('../languages/english.json')
const welcomeSchema = require('../schema/welcome-schema')

module.exports = (bot) => {

    const cache = {}

    command(bot, 'setwelcome', async (message) => {
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
        cache[guild.id] = [channel.id, text]

        await mongo().then(async (mongoose) => {
            try {
               await welcomeSchema.findOneAndUpdate({
                   _id: guild.id
               }, {
                    _id: guild.id,
                    channelId: channel.id,
                    text: text,
               }, {
                   upsert: true
               })
            } finally {
                mongoose.connection.close()
            }
        })

        channel.send('Welcome channel successfully set')

    })

    const onJoin = async member => {
        const { guild } = member
        var result = null

        //Search cache from Guild.id
        let data = cache[guild.id]

            console.log('FETCHING FROM DATABASE')

            await mongo().then(async (mongoose) => {
                try {
                    result = await welcomeSchema.findOne({ _id: guild.id })

                    if(result != null)

                    cache[guild.id] = data = [result.channelId, result.text]
                } finally {
                   mongoose.connection.close()
                }
            })

        if(result != null){

        const channelId = data[0]
        const text = data[1]

        const channel = guild.channels.cache.get(channelId)
        channel.send(text.replace(/<@>/g, `<@${member.id}>`).replace(/<§>/g, `${guild.name}`))
    }
    }

    command(bot, 'simjoin', message => {
        const { member } = message
        if (!member.hasPermission('ADMINISTRATOR')) {
            channel.send(`${english.not_allowed}`)
            return
        }
        onJoin(message.member)
    })

    bot.on('guildMemberAdd', member => {
        onJoin(member)
    })
}