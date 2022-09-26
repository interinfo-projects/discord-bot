import type { CommandInteraction } from 'discord.js'
import { EmbedBuilder } from 'discord.js'
import type { MySuperClient } from '../../index'

export default {
  name: 'ping',
  description: 'Ping Command!',
  async run(client: MySuperClient, interaction: CommandInteraction) {
    const embed = new EmbedBuilder()
      .setTitle('🏓 Pong!')
      .setThumbnail(client.user!.displayAvatarURL())
      .addFields(
        { name: 'Latence', value: `\`${client.ws!.ping}ms\``, inline: true },
        { name: 'Uptime', value: `<t:${parseInt(String(client.readyTimestamp! / 1000))}:R>`, inline: true },
      )
      .setTimestamp()
      .setFooter({
        text: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      })

    await interaction.reply({ embeds: [embed] })
  },
}
