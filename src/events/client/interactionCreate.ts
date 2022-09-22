import {MySuperClient} from "../../index";
import {CommandInteraction} from "discord.js";

export default {
    name: 'interactionCreate',
    once: false,
    async execute(client: MySuperClient, interaction: CommandInteraction) {
        if (interaction.isCommand()) {
            const cmd = client.commands.get(interaction.commandName);
            if (!cmd) return interaction.reply(`This command doesn't exist`);
            cmd.runSlash(client, interaction);
        }
    }
};