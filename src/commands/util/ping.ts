import {Message} from "discord.js";
import {MySuperClient} from "../../index";

export default {
    name: 'ping',
    execute(client: MySuperClient, message: Message) {
        message.channel.send("Pong!");
    }
};