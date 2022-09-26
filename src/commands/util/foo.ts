import type { CommandInteraction } from 'discord.js'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import type { MySuperClient } from '../../index'

const buttons = new ActionRowBuilder<ButtonBuilder>()
  .addComponents(
    new ButtonBuilder()
      .setCustomId('primary-button')
      .setLabel('Primary')
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId('secondary-button')
      .setLabel('Secondary')
      .setStyle(ButtonStyle.Secondary),

    new ButtonBuilder()
      .setCustomId('success-button')
      .setLabel('Success')
      .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
      .setCustomId('danger-button')
      .setLabel('Danger')
      .setStyle(ButtonStyle.Danger),

    new ButtonBuilder()
      .setURL('https://google.com')
      .setLabel('Link')
      .setStyle(ButtonStyle.Link),
  )

export default {
  name: 'foo',
  description: 'Foo Command!',
  async run(client: MySuperClient, interaction: CommandInteraction) {
    await interaction.reply({ content: 'Click on buttons', components: [buttons] })
  },
}
