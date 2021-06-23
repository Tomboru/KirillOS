const mongo = require('../function/mongo')
const command = require('./command')
const english = require('../languages/english.json')
const fjSchema = require('../schema/fj-schema')
let Discord = require('discord.js');

const cache = {}

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
        /////// 
        ///////
        /////// The clear function still in work
        ///////
        ///////
        if(titel === "clear"){
            titel = ""
            console.log("Only clear");
            console.log(titel)
        }else{
        console.log(titel)

        //cache[guild.id] = [titel]

        await mongo().then(async (mongoose) => {
            try {
                await fjSchema.findOneAndUpdate({
                    _id: guild.id
                }, {
                    _id: guild.id,
                    titel: titel,
                }, {
                    upsert: true
                })
            } finally {
            }
        })

        channel.send('Titel successfully set')
    }
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
        //cache[guild.id] = [color]

        await mongo().then(async (mongoose) => {
            try {
                await fjSchema.findOneAndUpdate({
                    _id: guild.id
                }, {
                    _id: guild.id,
                    color: color,
                }, {
                    upsert: true
                })
            } finally {
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
        //cache[guild.id] = [description]

        await mongo().then(async (mongoose) => {
            try {
                await fjSchema.findOneAndUpdate({
                    _id: guild.id
                }, {
                    _id: guild.id,
                    description: description,
                }, {
                    upsert: true
                })
            } finally {
            }
        })
        channel.send('Description successfully set')
    })

    //Deactivate
    command(bot, 'firstjoin deactivate', async (message) => {
        const { member, channel, content, guild } = message

        if (!member.hasPermission('ADMINISTRATOR')) {
            channel.send(`${english.not_allowed}`)
            return;
        }

        let text = content

        const split = text.split(' ')

        if (split.length != 2) {
            channel.send('Something went wrong.')
            return;
        }

        var toggle = 1
        //cache[guild.id] = [toggle]

        console.log(toggle)

        await mongo().then(async (mongoose) => {
            try {
                await fjSchema.findOneAndUpdate({
                    _id: guild.id
                }, {
                    _id: guild.id,
                    toggle1: toggle,
                }, {
                    upsert: true
                })
            } finally {
            }
            console.log(toggle)
        })
        channel.send('Join PM deactivated')
    })

        //Activate
    command(bot, 'firstjoin activate', async (message) => {
        const { member, channel, content, guild } = message
    
        if (!member.hasPermission('ADMINISTRATOR')) {
            channel.send(`${english.not_allowed}`)
            return;
        }
    
        let text = content
    
        const split = text.split(' ')
    
        if (split.length != 2) {
            channel.send('Something went wrong.')
            return;
        }
    
        var toggle = 2
        console.log(toggle)
        //cache[guild.id] = [toggle]
    
        await mongo().then(async (mongoose) => {
            try {
                await fjSchema.findOneAndUpdate({
                    _id: guild.id
                }, {
                    _id: guild.id,
                    toggle1: toggle,
                }, {
                    upsert: true
                })
            } finally {
            }
        })
        channel.send('Join PM activated')
    })

     const onJoin = async member => {
            const { guild } = member
        
            //let data = cache[guild.id]
            
           // if(!data){
                console.log('Fetching First Join from DATABASE')
        
                await mongo().then(async (mongoose) => {
                    try {
                        result2 = await fjSchema.findOne({_id: guild.id})

                        //console.log(result2)
                        if(result2 == null)return;
                        console.log("Caching first join from data")
                        cache[guild.id] = data = [result2.titel, result2.color, result2.description, result2.toggle1]
                    } finally {
                    }
                })
           //}
            if(result2 == null)return;
        
            const titel = data[0]
            const color = data[1]
            const description = data[2]
            const toggle = data[3]
        
            console.log(toggle)

            if(toggle == 1)return;

            let embed = new Discord.MessageEmbed()
            .setAuthor(titel.replace(/<@>/g, `<@${member.id}>`).replace(/<§>/g, `${guild.name}`), bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setColor(color)
            .setDescription(description.replace(/<@>/g, `<@${member.id}>`).replace(/<§>/g, `${guild.name}`))
            .setFooter('KirillOS')
            .setTimestamp()
            member.send(embed);
        };

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