const { mongo } = require('mongoose')
const warnSchema = require('../schema/warn-schema')

module.exports = {
    minArgs: 3,
    expectedArgs: '<USERNAME> <REASON>',
    requiredPermission: ['MANAGE_MESSAGES'],
    callback: async ({ message, args }) => {
        const { guild, mentions } = message
        const { channels } = mentions
        const target = message.mentions.users.first()

        if (!guild.me.hasPermission('SEND_MESSAGES')) {
            message.delete()
        }

        if (!target) {
            message.reply('Please specify someone to warn.')
            return;
        }

        //OS!war @Test

        arguments.shift()

        const guildId = message.guild.id
        const userId = message.member.id
        const reason = arguments.join(' ')

        const warning = {
            author: userID,
            timestamp: new Date().getTime(),
            reason
        }

        await mongo().then(async mongoose => {
            try {
                await warnSchema.findOneAndUpdate({
                    guildId,
                    userId,
                }, {
                    guildId,
                    userId,
                    $push: {
                        warnings: warning
                    }
                }, {
                    upsert: true
                })
            } finally {
            }
        })
        .save()
        .catch(() => {
            message.reply('Failed to save to the database, please report this!')
                .then((message) => {
                    message.delete({
                        timeout: 1000 * 10
                    })
                })
        })
    },
}