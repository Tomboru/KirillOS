const warnSchema = require('../schema/warn-schema')
let Discord = require('discord.js')

module.exports = {
  minArgs: 2,
  expectedArgs: "<Target user's @> <reason>",
  requiredPermissions: ['ADMINISTRATOR'],
  callback: async ({message, args}) => {
    const { guild, mentions } = message
    const { users } = mentions
    const target = users.first()
    if (!target) {
      message.reply('Please specify someone to warn.')
      return
    }
    if (guild.me.hasPermission('MANAGE_MESSAGES')) {
      message.delete()
  }

    args.shift()

    const guildId = message.guild.id
    const userId = target.id
    const reason = args.join(' ')

    const warning = {
      author: message.member.user.tag,
      timestamp: new Date().getTime(),
      reason,
    }

    await warnSchema.findOneAndUpdate(
      {
        guildId,
        userId,
      },
      {
        guildId,
        userId,
        $push: {
          warnings: warning,
        },
      },
      {
        upsert: true,
      }
    )

    message.channel.send(new Discord.MessageEmbed()
        .setAuthor('User warned',)
        .setThumbnail(target.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setColor('56C596')
        .setDescription(`${target} was successfully warned.                               `) //\n${target} has now ${countwarns}
        .addField(`Got warned because of `, `${reason}`)
        .setTimestamp()
        )
      console.log(target)
    }
}