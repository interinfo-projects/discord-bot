import type { Guild } from 'discord.js'
import type { MySuperClient } from '../../index'

export default {
  name: 'ready',
  once: true,
  async execute(client: MySuperClient) {
    // eslint-disable-next-line no-console
    console.log('I\'m ready!')

    const devGuild: Guild = await client.guilds.cache.get(process.env.DISCORD_DEVELOP!)!
    await devGuild.commands.set(client.commands.map(cmd => cmd))
  },
}
