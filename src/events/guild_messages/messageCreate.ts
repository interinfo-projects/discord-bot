import {Client, Message} from "discord.js";

const prefix = '!'

export default {
    name: 'messageCreate',
    once: false,
    execute(client: Client, message: Message) {
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;

        const args: string[] = message.content.slice(prefix.length).trim().split(/ +/g);
        if (args.length === 0) return;
        const cmdName = args?.shift()?.toLowerCase();
        if (!cmdName) return;
        if (args.length === 0) return;

        let cmd = client.commands.get(cmdName);
        if (cmd) cmd.run(client, message, args);
    }
};