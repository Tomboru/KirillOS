module.exports = {
    requiredPermissions: ['ADMINISTRATOR'],
    maxArgs: 0,
    callback: async ({ member, args }) => {
        const { guild } = member

        if (guild.me.hasPermission('MANAGE_MESSAGES')) {
            message.delete()
        }

        if (!guild.me.hasPermission('MANAGE_CHANNELS')) {
            message.reply("The bot requires acces to manage channels to be able to create the stats")
            return;
        }

        //Check if False => Return

        
        
    }
}