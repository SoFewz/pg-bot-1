  
module.exports = {
    name: "ping",
    category: "info",
    description: "Returns latency and API ping",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🏓 Pinging....`);

        msg.edit(`🏓 Pong!
        La latence est de ${Math.floor(msg.createdTimestap - message.createdTimestap)}ms
        Latance de l'API est de ${Math.round(client.ping)}ms`);
    }
}