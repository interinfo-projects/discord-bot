import {Client, Collection, GatewayIntentBits} from "discord.js";
import dotenv from "dotenv";

dotenv.config();

console.log("Bot is starting...");

const client: Client = new Client({
    intents: 513,
});


client.commands = new Collection();

['event', 'command'].forEach(async (handler: string) => {
    const {default: util} = await import(`./utils/handlers/${handler}.util.ts`);
    util(client);
});
void client.login(process.env.DISCORD_TOKEN);