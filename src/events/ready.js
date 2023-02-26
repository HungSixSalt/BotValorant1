const { ActivityType, Events } = require('discord.js');
const chalk = require('chalk');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        await client.user.setPresence({ 
            activities: [{ name: "CyberPunk 2023", type: ActivityType.Playing }],
            status: "online"
        });

        console.log(chalk.white(`[${chalk.blueBright("CLIENT")}]${chalk.white(" - ")}Connected to ${client.user.username}, started in ${client.guilds.cache.size} guild(s)`))
        console.log(" ")
    }
}