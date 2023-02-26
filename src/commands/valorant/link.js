const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const DarkGG = require("../../DarkGG");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("link")
    .setDescription("Liên kết tài khoản với bot")
    .setDMPermission(false)
    .addStringOption(option =>
        option.setName('id')
            .setDescription('Nhập id game của bạn theo định dạng <User>#<ID>')
            .setRequired(true)),
    async execute(interaction, client) {
        //lấy dữ liệu thông qua id người dùng cung cấp
        
        //let userprofile = await DarkGG.GetUserProfile(interaction.options.getString("id"));
        let riotID = interaction.options.getString("id")
        if(!riotID.includes("#")){
            return await interaction.reply({ embeds: [new EmbedBuilder().setDescription(`Nhập sai định dạng ID vui lòng thử lại`).setColor("Red")] })
        }
        DarkGG.AddLinkUser(interaction.user.id,riotID)

        return await interaction.reply({ embeds: [new EmbedBuilder().setDescription(`Tài khoản của bạn đã được liên kết thành công với ID **${riotID}**`).setColor("Green")] })
    }
}