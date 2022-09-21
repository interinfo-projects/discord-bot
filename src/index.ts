import {Client, ClientOptions, Collection, GatewayIntentBits, Message, Partials} from "discord.js";
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

    constructor(options: ClientOptions){
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

void client.login(process.env.DISCORD_TOKEN);