import type { ChatInputCommandInteraction } from 'discord.js'
import { ApplicationCommandOptionType } from 'discord.js'
import type { MySuperClient } from '../../index'

export default {
  name: 'emit',
  description: 'Emit a chosen event!',
  options: [
    {
      name: 'event',
      description: 'Choose an event to emit',
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: 'guildMemberAdd',
          value: 'guildMemberAdd',
        },
        {
          name: 'guildMemberRemove',
          value: 'guildMemberRemove',
        },
      ],
    },
  ],
  run(client: MySuperClient, interaction: ChatInputCommandInteraction) {
    const eventChoices = interaction.options.getString('event')!

    client.emit(eventChoices, interaction.member)
    interaction.reply({ content: `Event ${eventChoices} emitted!`, ephemeral: true })
  },
}
