import type { ButtonInteraction } from 'discord.js'
import type { MySuperClient } from '../../index'

export default {
  name: 'success-button',
  async run(client: MySuperClient, interaction: ButtonInteraction) {
    await interaction.reply({ content: 'I am the success button!' })
  },
}
