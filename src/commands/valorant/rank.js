const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const DarkGG = require("../../DarkGG");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Cập nhật role rank, yêu cầu liên kết tài khoản trước")
    .setDMPermission(false),
  async execute(interaction, client) {
    let linkUser = await DarkGG.GetLinkUserByDiscordID(interaction.user.id);
    if (!linkUser) {
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
    //lấy dữ liệu thông qua id người dùng cung cấp

    let userprofile = await DarkGG.GetUserProfile(linkUser.riotID);
    if (!userprofile) {
      //https://auth.riotgames.com/login#client_id=dakgg&redirect_uri=https%3A%2F%2Fdak.gg%2Fauth%2Friotgames%2Fcallback&response_type=code&scope=openid%20cpid%20offline_access&state=val-api
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `Tài khoản của bạn không tồn tại hoặc chưa cấp quyền kiểm tra thông tin cho Dark.gg vui lòng [ấn vào đây để đăng nhập](https://auth.riotgames.com/login#client_id=dakgg&redirect_uri=https%3A%2F%2Fdak.gg%2Fauth%2Friotgames%2Fcallback&response_type=code&scope=openid%20cpid%20offline_access&state=val-api) sau đó thử lại`
            )
            .setColor("Red"),
        ],
      });
    }

    let userpuuid = userprofile.pageProps.account.account.puuid;
    let lastSeasonID = userprofile.pageProps.accountSeasons.seasons[0].season;
    let embedNeedPlay = new EmbedBuilder()
      .setDescription(
        `Bạn phải chơi ít nhất một trận rank mùa hiện tại mới có thể cập nhật rank`
      )
      .setColor("Red");
    if (!lastSeasonID) {
      return await interaction.reply({ embeds: [embedNeedPlay] });
    }
    let lastSeasonStats = await DarkGG.GetLastSeasonStats(
      userpuuid,
      lastSeasonID
    );
    if (!lastSeasonStats.stats.competitive) {
      return await interaction.reply({ embeds: [embedNeedPlay] });
    }
    let competitive = lastSeasonStats.stats.competitive;
    //lấy tên rank
    let tierName = DarkGG.tier[competitive.competitiveTierId];
    //xóa tất cả role rank của nember
    DarkGG.tier.forEach(element => {
        if(interaction.member.roles.cache.some(role => role.name == element ||role.name!= tierName)){
            let role = interaction.guild.roles.cache.find((role) => role.name == element);
            interaction.member.roles.remove(role);
        }
    });
   
    //kiểm tra role có tên giống với tên rank có tồn tịa không, nếu không có sẽ tự động tạo
    let role = interaction.guild.roles.cache.find((role) => role.name == tierName);
    if (!role) {
      role = await interaction.guild.roles.create({
        name: tierName
      });
    }

    await interaction.member.roles.add(role);

    return await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`Đã cấp role **${tierName}** thành công`)
          .setColor("Green"),
      ],
    });
  },
};
