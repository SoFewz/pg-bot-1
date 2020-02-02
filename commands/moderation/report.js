const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "report",
    category: "moderation",
    description: "Reports a member",
    usage: "<mention, id>",
    run: async (client, message, args) => {
        // If the bot can delete the message, do so
        if (message.deletable) message.delete();

        // Either a mention or ID
        let rMember = message.mentions.members.first() || message.guild.members.get(args[0]);

        // No person found
        if (!rMember)
            return message.reply("Je ne trouve pas le membre ..").then(m => m.delete(5000));

        // The member has BAN_MEMBERS or is a bot
        if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
            return message.channel.send("Je ne peux pas report ce membre !").then(m => m.delete(5000));

        // If there's no argument
        if (!args[1])
            return message.channel.send("Merci de suivre le modèle indiqué !").then(m => m.delete(5000));
        
        const channel = message.guild.channels.find(c => c.name === "reports")
            
        // No channel found
        if (!channel)
            return message.channel.send("Couldn't find a `#reports` channel").then(m => m.delete(5000));

        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Report", rMember.user.displayAvatarURL)
            .setDescription(stripIndents`**> Membre:** ${rMember} (${rMember.user.id})
            **> Report par:** ${message.member}
            **> Report dans:** ${message.channel}
            **> Raison:** ${args.slice(1).join(" ")}`);

        return channel.send(embed);
    }
}