const mongo = require('../function/mongo')
const command = require('./command')
const english = require('../languages/english.json')
const fjtitelschema = require('../schema/fj-titel-schema')

module.exports = (bot) => {

    command(bot, 'firstjoin titel', async (message) => {
        const { member, channel, content, guild } = message

        if (!member.hasPermission('ADMINISTRATOR')) {
            channel.send(`${english.not_allowed}`)
            return;
        }

        let text = content

        const split = text.split(' ')

        if (split.length < 3) {
            channel.send('Please provide a titel')
            return;
        }

        split.shift()
        split.shift()
        var titel = ""
        for(var i = 0; i<split.length; i++){
            titel +=" "+ split[i]
        }
        console.log(titel)

        await mongo().then(async (mongoose) => {
            try {
                await fjtitelschema.findOneAndUpdate({
                    _id: guild._id
                }, {
                    _id: guild.id,
                    text: titel,
                }, {
                    upsert: true
                })
            } finally {
                mongoose.connection.close()
            }
        })
        channel.send('Titel successfully set')
    })

    command(bot, 'firstjoin color', async (message) => {
        const { member, channel, content, guild } = message

        if (!member.hasPermission('ADMINISTRATOR')) {
            channel.send(`${english.not_allowed}`)
            return;
        }

        let text = content

        const split = text.split(' ')

        if (split.length != 3) {
            channel.send('Please provide a Color')
            return;
        }

        split.shift()
        split.shift()
        var color = ""
        for(var i = 0; i<split.length; i++){
            color +=" "+ split[i]
        }
        console.log(color)

        await mongo().then(async (mongoose) => {
            try {
                await fjcolorschema.findOneAndUpdate({
                    _id: guild._id
                }, {
                    _id: guild.id,
                    text: color,
                }, {
                    upsert: true
                })
            } finally {
                mongoose.connection.close()
            }
        })
        channel.send('Color successfully set')
    })

    command(bot, 'firstjoin description', async (message) => {
        const { member, channel, content, guild } = message

        if (!member.hasPermission('ADMINISTRATOR')) {
            channel.send(`${english.not_allowed}`)
            return;
        }

        let text = content

        const split = text.split(' ')

        if (split.length < 3) {
            channel.send('Please provide a description')
            return;
        }

        split.shift()
        split.shift()
        var description = ""
        for(var i = 0; i<split.length; i++){
            description +=" "+ split[i]
        }
        console.log(description)

        await mongo().then(async (mongoose) => {
            try {
                await fjdescriptionschema.findOneAndUpdate({
                    _id: guild._id
                }, {
                    _id: guild.id,
                    text: description,
                }, {
                    upsert: true
                })
            } finally {
                mongoose.connection.close()
            }
        })
        channel.send('Description successfully set')
    })

}