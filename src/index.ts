import {Client, GatewayIntentBits} from "discord.js";
import dotenv from "dotenv";
dotenv.config();

console.log("Bot is starting...");

const client: Client = new Client({
  intents: 1,
});


client.once('ready', () => {
  console.log("Je suis prêt!");
});

client.login(process.env.DISCORD_TOKEN);