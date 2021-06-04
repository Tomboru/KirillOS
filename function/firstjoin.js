module.exports = (bot) => {
    let Discord = require('discord.js');

bot.on('guildMemberAdd', async (member) => {
    const { guild } = member
    let embed = new Discord.MessageEmbed()
    .setAuthor(`Herzlich Willkommen auf ${guild.name}`, bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .setColor('7289da')
    .setDescription()
    .addField("Wilkommen")
    member.send(embed);
});
}