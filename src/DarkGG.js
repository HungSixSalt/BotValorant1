const Utility = require("./Utility");
const fs = require("fs");
class DarkGG {
  static linkUsers = [];
  static pathDataLinkUsers = "data/LinkUsers.json";
  static tier = [
    "Unrated",
    "Iron 1",
    "Iron 2",
    "Iron 3",
    "Bronze 1",
    "Bronze 2",
    "Bronze 3",
    "Silver 1",
    "Silver 2",
    "Silver 3",
    "Gold 1",
    "Gold 2",
    "Gold 3",
    "Platinum 1",
    "Platinum 2",
    "Platinum 3",
    "Diamond 1",
    "Diamond 2",
    "Diamond 3",
    "Ascendant 1",
    "Ascendant 2",
    "Ascendant 3",
    "Immortal",
    "Immortal 1",
    "Immortal 2",
    "Immortal 3",
    "Radiant",
    "Radiant",
  ];
  static async AddLinkUser(discordID, riotID) {
    for (let i = 0; i < DarkGG.linkUsers.length; i++) {
      const user = DarkGG.linkUsers[i];
      if (user.discordID == discordID) {
        DarkGG.linkUsers[i].riotID = riotID;
        await DarkGG.SaveLinkUsers();
        return true;
      }
    }
    DarkGG.linkUsers.push({ discordID: discordID, riotID: riotID });
    await DarkGG.SaveLinkUsers();
  }
  static async GetLinkUserByDiscordID(discordID) {
    for (let i = 0; i < DarkGG.linkUsers.length; i++) {
      const user = DarkGG.linkUsers[i];
      if (user.discordID == discordID) {
        return user;
      }
    }
    return undefined;
  }
  static async LoadLinkUsers() {
    let objectData = JSON.parse(
      await fs.promises.readFile(DarkGG.pathDataLinkUsers)
    );
    console.log(objectData);
    DarkGG.linkUsers = objectData;
    console.log("loaded LinkUsers");
  }
  static async SaveLinkUsers() {
    await fs.promises.writeFile(
      DarkGG.pathDataLinkUsers,
      JSON.stringify(DarkGG.linkUsers)
    );
  }
  //lấy dữ liệu người chơi qua id
  static async GetUserProfile(id) {
    let data = await Utility.DownloadData(
      `https://dak.gg/valorant/_next/data/0UwWEikFYni1rYUhT_nKN/en/profile/${id.replace(
        "#",
        "-"
      )}.json`
    );
    //kiểm tra người chơi có tồn tại trên dữ liệu của API không
    if (!data.pageProps.account) {
      return undefined;
    }

    return data;
  }

  static async GetLastSeasonStats(puuid, seasonID) {
    return await Utility.DownloadData(
      `https://val.dakgg.io/api/v1/accounts/${puuid}/seasons/${seasonID}`
    );
  }
  static async GetLastSeasonStatsByID(id) {
    let userprofile = await this.GetUserProfile(id);
    if (!userprofile) {
      //1 là lỗi người dùng chưa liên kết tài khoản với darkgg, hoặc nhập sai tài khoản
      return 1;
    }
    let userpuuid = userprofile.pageProps.account.account.puuid;
    //trả về id lỗi để xác định nguyên nhân

    let lastSeasonID = userprofile.pageProps.accountSeasons.seasons[0].season;
    if (!lastSeasonID) {
      //2 lỗi người chơi chưa chơi trận nào trong mùa hiện tại
      return 2;
    }
    let lastSeaonStats = await this.GetLastSeasonStats(userpuuid, lastSeasonID);
    return lastSeaonStats;
  }
}
module.exports = DarkGG;
