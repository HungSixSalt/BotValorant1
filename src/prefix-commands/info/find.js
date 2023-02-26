const { EmbedBuilder, Embed} = require("discord.js");

module.exports = {
  name: "find",
    aliases: ["g"],
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])|| message.member
      if (!message.member.voice.channel)return message.reply("you must be in a voice channel")
        const avatarURL = member.displayAvatarURL({ format: 'png', size: 32, dynamic: true })
      
        
        const count = member.voice.channel.members.size
        const limit = member.voice.channel.userLimit

      
        const embedVC = new EmbedBuilder()
            .setColor("Aqua")
            .setAuthor({name:`${member.displayName}`,iconURL:`${avatarURL}`})
            .setThumbnail('https://cdn.discordapp.com/emojis/1069566627097624606.webp?size=96&quality=lossless')
            .setDescription(`\n<#${message.member.voice.channel.id}> ***number of players  ${count}/${limit}***`)
            .setTitle(`Nhấn vào để tham gia `)
            message.reply({embeds: [embedVC]});
    }
}