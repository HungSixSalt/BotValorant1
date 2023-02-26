const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { userInfo } = require("os");
const DarkGG = require("../../DarkGG");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("id")
    .setDescription("Liên kết tài khoản với bot")
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Chọn tài khoản để lấy id nếu đã được liên kết")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    //lấy dữ liệu thông qua id người dùng cung cấp

    //let userprofile = await DarkGG.GetUserProfile(interaction.options.getString("id"));

    let discordUser = interaction.options.getUser("target");
    if (!discordUser) {
      let linkUser = await DarkGG.GetLinkUserByDiscordID(interaction.user.id);
      if (linkUser) {
        return await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(`ID Game của bạn là: ${linkUser.riotID}`)
              .setColor("Green"),
          ],
        });
      } else {
        return await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(
                `Tài khoản của bạn chưa được liên kết với bot, sử dụng lệnh /link <ID game> để liên kết`
              )
              .setColor("Red"),
          ],
        });
      }
    }

    let linkUser = await DarkGG.GetLinkUserByDiscordID(discordUser.id);

    if (linkUser) {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`ID Game của ${discordUser} là: ${linkUser.riotID}`)
            .setColor("Green"),
        ],
      });
    } else {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `Tài khoản của ${discordUser} chưa được liên kết với bot, sử dụng lệnh /link <ID game> để liên kết`
            )
            .setColor("Red"),
        ],
      });
    }
  },
};
