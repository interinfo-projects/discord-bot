import {Client, Message} from "discord.js";

export default {
    name: 'ready',
    run(client: Client, message: Message, args) {
        message.channel.send("Pong!");
    }
};