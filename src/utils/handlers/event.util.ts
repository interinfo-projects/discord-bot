import { promisify } from 'util'
import { glob } from 'glob'
import { Events } from 'discord.js'
import type { MySuperClient } from '../../index'

const pGlob = promisify(glob)

export default async (client: MySuperClient) => {
  (await pGlob(`${process.cwd()}/src/events/*/*.ts`)).map(async (eventFile) => {
    const { default: event } = await import(eventFile)

    if (!Object.values(Events).includes(event.name))
      return console.error(`Error : Event name not in discord.js events list in ${eventFile}.`)
    if (!event.name)
      return console.error(`Error : No event name provided in ${eventFile}.`)

    event.once
      ? client.once(event.name, (...args) => {
        event.execute(client, ...args)
      })
      : client.on(event.name, (...args) => event.execute(client, ...args))

    // eslint-disable-next-line no-console
    console.log(`Event loaded: ${event.name}`)
  })
}
