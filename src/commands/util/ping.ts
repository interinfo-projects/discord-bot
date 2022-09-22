import {CommandInteraction, Message} from "discord.js";
import {MySuperClient} from "../../index";

export default {
    name: 'ping',
    description: 'Ping Command!',
    run(client: MySuperClient, message: Message) {
        // message.channel.send("Pong!"); // Commented to block is usage
    },
    runSlash(client: MySuperClient, interaction: CommandInteraction) {
        interaction.reply('Pong!');
    }
};