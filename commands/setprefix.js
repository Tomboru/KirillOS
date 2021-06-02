const mongo = require('../function/mongo')
const command = require('./command')
const german = require('../languages/german.json')
const extra = require('../languages/extra.json')
const english = require('../languages/english.json')
const configSchema = require('../schema/config-schema')

module.exports = (bot) => {

    const cache = {}

    command(bot, 'setprefix', async (message) => {
        const { member, channel, content, guild } = message


        if (!member.hasPermission('ADMINISTRATOR')) {
            channel.send(`${english.not_allowed}`)
            return
        }

        let text = content

        const split = text.split(' ')

        if (split.length < 1) {
            channel.send('Please provide prefix')
            return
        }

        if (split.length > 2) {
            channel.send('Please provide prefix')
            return
        }

        split.shift()
        text = split.join(' ')

        cache[guild.id] = [text]

        await mongo().then(async (mongoose) => {
            try {
               await configSchema.findOneAndUpdate({
                   _id: guild.id
               }, {
                    _id: guild.id,
                    prefix: text //<- Wenn keine Config existiert, soll automatisch eine erstellt werden und als Standart Prefix "OS!" genommen werden. Aber, falls config existiert, soll nichts geändert werden.
               }, {
                   upsert: true
               })
            } finally {
                mongoose.connection.close()   
            }
        })
    

        channel.send('Prefix successfully set')


    })
}