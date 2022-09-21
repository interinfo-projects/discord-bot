import {Client, ClientOptions, Collection, GatewayIntentBits, Message} from "discord.js";
import dotenv from "dotenv";

dotenv.config();

console.log("Bot is starting...");

export interface Command {
    name: string;
    description: string;
    execute: (client: MySuperClient, message: Message, args: string[]) => any;
}

export class MySuperClient extends Client {
    public commands: Collection<string, Command>;

    constructor(options: ClientOptions) {
        super(options);
        this.commands = new Collection();
    }
}

const client: Client = new MySuperClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

['event', 'command'].forEach(async (handler: string) => {
    const {default: util} = await import(`./utils/handlers/${handler}.util.ts`);
    util(client);
});

process.on('exit', (code) => console.log(`Process exit with code :${code}`));
process.on('uncaughtException', (error, origin) => console.log(`UNCAUGHT_EXCEPTION: ${error}`, `Origin: ${origin}`));
process.on('unhandledRejection', (reason, promise) => console.log(`UNHANDLED_REJECTION: ${reason}`, promise));
process.on('warning', (...args) => console.log(...args));

void client.login(process.env.DISCORD_TOKEN);