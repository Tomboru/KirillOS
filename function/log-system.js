const config = require('../config/config.json');
let Discord = require('discord.js');
const german = require('../languages/german.json')
const extra = require('../languages/extra.json')
const english = require('../languages/english.json')
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
const mdb = require('../config/mongodb.json')

var url = `${mdb.mongodbl}`;

module.exports = (bot) => {

    function newLogs (data){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("myFirstDatabase");
            dbo.collection("logs").insertOne(data, function(err, res) {
              if (err) throw err;
              console.log("New Log was created");
            });
          });
    }

    bot.on('message', (message) => {
        if (message.author.bot) return;
        console.log(`[${message.author.tag}]: ${message.content}`);
        var data = { guild: message.guild.id, date: message.createdTimestamp, guildname: message.guild.name, channelname: message.channel.name, user: message.author.username, message: message.content, channel: message.channel.id, messageId: message.id, author: message.author.id, edited: false, bot: false, deleted: false};
        newLogs(data);
        if (message.content === 'test'){
        message.channel.send(server.TESTMESSAGE)
        }
    });
}