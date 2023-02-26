const { EmbedBuilder, Embed} = require("discord.js");
const { model } = require("mongoose");

module.exports={
    name: "rank",
    aliases: ["p"],
    run: async(client,message,args)=>{
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])|| message.member
        var userid = member.id;
    }
}