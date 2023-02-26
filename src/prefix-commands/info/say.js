const { EmbedBuilder, Embed} = require("discord.js");
const { model } = require("mongoose");

module.exports={
    name: "say",
    aliases: ["p"],
    run: async(client,mess,args)=>{
        if(mess.deletable){
            mess.delete();
        }
            mess.channel.send(args.join(' '));
    }
}