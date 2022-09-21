import {Message} from "discord.js";
import {MySuperClient} from "../../index";

const prefix = '!'

export default {
    name: 'messageCreate',
    once: false,
    execute(client: MySuperClient, message: Message) {
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;

        const args: string[] = message.content.slice(prefix.length).trim().split(/ +/g);
        if (args.length === 0) return;
        const cmdName = args?.shift()?.toLowerCase();
        if (!cmdName) return;

        let cmd = client.commands.get(cmdName);
        if (cmd) cmd.execute(client, message, args);
    }
};