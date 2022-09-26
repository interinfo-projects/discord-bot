import type { Channel, GuildMember } from 'discord.js'
import { ChannelType, EmbedBuilder } from 'discord.js'
import type { MySuperClient } from '../../index'

export default {
  name: 'guildMemberAdd',
  once: false,
  async execute(client: MySuperClient, member: GuildMember) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL() })
      .setColor('#21ff81')
      .setDescription(
                `Username: ${member}
                Created: <t:${parseInt(String(member.user.createdTimestamp! / 1000))}:f> (<t:${parseInt(String(member.user.createdTimestamp! / 1000))}:R>)
                Join: <t:${parseInt(String(member.joinedTimestamp! / 1000))}:f> (<t:${parseInt(String(member.joinedTimestamp! / 1000))}:R>)`,
      )
      .setTimestamp()
      .setFooter({ text: 'The user just arrived' })

    const logChannel: Channel = client.channels.cache.get('727514400797491250')!
    if (logChannel.type === ChannelType.GuildText)
      await logChannel.send({ embeds: [embed] })
  },
}
