module.exports = {
    expectedArgs: "<Target user's @>",
    callback: async (message, arguments, text) => {

        const target = message.mention.users.first()
        if (!target) {
            message.reply("Test funktioniert")
            return;
        }

        if (member.hasPermission('MANAGE_MESSAGES')) {
            
        }
    }
}