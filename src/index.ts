import {Client, GatewayIntentBits} from "discord.js";
import dotenv from "dotenv";

dotenv.config();

console.log("Bot is starting...");

const client: Client = new Client({
    intents: 1,
});

['event', 'command'].forEach(async (handler) => {
    const {default: util} = await import(`./utils/handlers/${handler}.util.ts`);
    util(client);
});
client.login(process.env.DISCORD_TOKEN);