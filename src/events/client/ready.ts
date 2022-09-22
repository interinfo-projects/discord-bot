import {MySuperClient} from "../../index";
import {Guild} from "discord.js";

export default {
    name: 'ready',
    once: true,
    async execute(client: MySuperClient) {
        console.log(`I'm ready!`);

        const devGuild: Guild = await client.guilds.cache.get(process.env.DISCORD_DEVELOP!)!;
        devGuild.commands.set(client.commands.map((cmd) => cmd));
    }
};