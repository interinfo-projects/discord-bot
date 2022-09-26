import type { ButtonInteraction } from 'discord.js'
import type { MySuperClient } from '../../index'

export default {
  name: 'danger-button',
  async run(client: MySuperClient, interaction: ButtonInteraction) {
    await interaction.reply({ content: 'I am the danger Skyler!' })
  },
}
