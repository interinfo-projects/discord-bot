import type { Interaction } from 'discord.js'
import type { MySuperClient } from '../../index'

export default {
  name: 'interactionCreate',
  once: false,
  async execute(client: MySuperClient, interaction: Interaction) {
    if (interaction.isCommand()) {
      const cmd = client.commands.get(interaction.commandName)
      if (!cmd)
        return interaction.reply('This command doesn\'t exist')
      cmd.run(client, interaction)
    }
    else if (interaction.isButton()) {
      const btn = client.buttons.get(interaction.customId)
      if (!btn)
        return interaction.reply('This button doesn\'t exist')
      btn.run(client, interaction)
    }
  },
}
