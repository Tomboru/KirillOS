const command = require('./command')
const english = require('../languages/english.json')

module.exports = (bot) => {

  var count = 0

  bot.on('guildMemberAdd', async (member) => {
    const { guild } = member
    
    //If Server stats channel does not exist, then it returns
    var find = guild.channels.cache.find(channel2 => channel2.name === `📊 SERVER STATS 📊`);
    if(!find);

    var AllMembersa = `All Members: ${guild.members.cache.size - 1}`
    var OnlyBotsa = `Bots: ${guild.members.cache.filter(member => member.user.bot).size - 1}`
    var OnlyMembersa = `Members: ${guild.members.cache.filter(member => !member.user.bot).size - 1}`
    var MinecraftTeama = `Minecraft Team: ${guild.members.cache.filter(member => member.roles.cache.has("835272511998525502")).size - 1}`
    var AllMembers = `All Members: ${guild.members.cache.size}`
    var OnlyBots = `Bots: ${guild.members.cache.filter(member => member.user.bot).size}`
    var OnlyMembers = `Members: ${guild.members.cache.filter(member => !member.user.bot).size}`
    var MinecraftTeam = `Minecraft Team: ${guild.members.cache.filter(member => member.roles.cache.has("835272511998525502")).size}`


    var All = guild.channels.cache.find(channel => channel.name === `${AllMembersa}`);
    if(!All)return;
    All.setName(AllMembers);
    console.log("Jo Klappt")

    var Member = guild.channels.cache.find(channel => channel.name === `${OnlyMembersa}`);
    if(!Member)return;
    Member.setName(OnlyMembers);

    var Bot = guild.channels.cache.find(channel => channel.name === `${OnlyBotsa}`);
    if(!Bot)return;
    Bot.setName(OnlyBots);
  

})

bot.on('guildMemberRemove', async (member) => {
  const { guild } = member

//If Server stats channel does not exist, then it returns
var find = guild.channels.cache.find(channel2 => channel2.name === `📊 SERVER STATS 📊`);
if(!find);

var AllMembersa = `All Members: ${guild.members.cache.size + 1}`
var OnlyBotsa = `Bots: ${guild.members.cache.filter(member => member.user.bot).size + 1}`
var OnlyMembersa = `Members: ${guild.members.cache.filter(member => !member.user.bot).size + 1}`
var MinecraftTeama = `Minecraft Team: ${guild.members.cache.filter(member => member.roles.cache.has("835272511998525502")).size + 1}`
var AllMembers = `All Members: ${guild.members.cache.size}`
var OnlyBots = `Bots: ${guild.members.cache.filter(member => member.user.bot).size}`
var OnlyMembers = `Members: ${guild.members.cache.filter(member => !member.user.bot).size}`
var MinecraftTeam = `Minecraft Team: ${guild.members.cache.filter(member => member.roles.cache.has("835272511998525502")).size}`


var All = guild.channels.cache.find(channel => channel.name === `${AllMembersa}`);
if(!All)return;
All.setName(AllMembers);
console.log("Jo Klappt")

var Member = guild.channels.cache.find(channel => channel.name === `${OnlyMembersa}`);
if(!Member)return;
Member.setName(OnlyMembers);

var Bot = guild.channels.cache.find(channel => channel.name === `${OnlyBotsa}`);
if(!Bot)return;
Bot.setName(OnlyBots);



})
  
    command(bot, 'setupstats', async (message) => {
        const { member, channel, guild} = message
        let AllMembers = `All Members: ${guild.members.cache.size}`
        let OnlyBots = `Bots: ${guild.members.cache.filter(member => member.user.bot).size}`
        let OnlyMembers = `Members: ${guild.members.cache.filter(member => !member.user.bot).size}`
        let MinecraftTeam = `Minecraft Team: ${guild.members.cache.filter(member => member.roles.cache.has("835272511998525502")).size}`

        if (!member.hasPermission('ADMINISTRATOR')) {
            channel.send(`${english.not_allowed}`)
            return
        }

        if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) {
            channel.send(`${english.missingMC}`)
            return
        }

        //When command executed send ->
        channel.send(`${english.StatsSetup}`)
        
        //Start setup
    
        const createdChannel = await message.guild.channels.create(`📊 SERVER STATS 📊`, {
            type: "category", //This create a text channel, you can make a voice one too, by changing "text" to "voice"
            position: 0,
            permissionOverwrites: [
               {
                 id: message.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
                 allow: ['VIEW_CHANNEL'], //Allow permissions
                 deny: ['CONNECT'] //Deny permissions
               }
            ],
          }).then(cat => {
              message.guild.channels.create(`${AllMembers}`, {
                  type: "voice",
                  parent: cat,
                  permissionOverwrites: [{
                    id: message.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
                    allow: ['VIEW_CHANNEL'], //Allow permissions
                    deny: ['CONNECT'] //Deny permissions
                  }]
              })

              message.guild.channels.create(`${OnlyMembers}`, {
                type: "voice",
                parent: cat,
                permissionOverwrites: [{
                  id: message.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
                  allow: ['VIEW_CHANNEL'], //Allow permissions
                  deny: ['CONNECT'] //Deny permissions
                }]
            })
        
            guild.channels.create(`${OnlyBots}`, {
                type: "voice",
                parent: cat,
                permissionOverwrites: [{
                  id: guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
                  allow: ['VIEW_CHANNEL'], //Allow permissions
                  deny: ['CONNECT'] //Deny permissions
                }]
            })
        }).catch(console.error);

        /*const tempo1 = guild.channels.create('Channel Tempo', { type: 'category' }).then(result => {
          console.log('Here is channel id', result.id)
          //create another channel here
          guild.channels.create(`${AllMembers}`, { type: 'voice'}).then(result2 => {
            console.log('Here is channel id', result2.id)
            //create another channel here
          })
          })
*/
        //When finished send ->
        channel.send(`${english.StatsSetupFinish}`)
        
    })



}