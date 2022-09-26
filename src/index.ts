import type {
  ButtonInteraction,
  ChatInputApplicationCommandData,
  ClientOptions,
  CommandInteraction,
  Message,
  MessageApplicationCommandData,
} from 'discord.js'
import { Client, Collection, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()

// eslint-disable-next-line no-console
console.log('Bot is starting...')

export interface Command extends ChatInputApplicationCommandData {
  name: string
  execute: (client: MySuperClient, message: Message, args: string[]) => any
  run: (client: MySuperClient, interaction: CommandInteraction) => any
}

export interface Button extends MessageApplicationCommandData {
  name: string
  description: string
  execute: (client: MySuperClient, message: Message, args: string[]) => any
  run: (client: MySuperClient, interaction: ButtonInteraction) => any
}

export class MySuperClient extends Client {
  public commands: Collection<string, Command>
  public buttons: Collection<string, Button>

  constructor(options: ClientOptions) {
    super(options)
    this.commands = new Collection()
    this.buttons = new Collection()
  }
}

const client: MySuperClient = new MySuperClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

['event', 'command', 'button'].forEach(async (handler: string) => {
  const { default: util } = await import(`./utils/handlers/${handler}.util.ts`)
  util(client)
})

process.on('exit', (code) => {
  // eslint-disable-next-line no-console
  console.log(`Process exit with code :${code}`)
})
process.on('uncaughtException', (error, origin) => {
  // eslint-disable-next-line no-console
  console.log(`UNCAUGHT_EXCEPTION: ${error}`, `Origin: ${origin}`)
})
process.on('unhandledRejection', (reason, promise) => {
  // eslint-disable-next-line no-console
  console.log(`UNHANDLED_REJECTION: ${reason}`, promise)
})
process.on('warning', (...args) => {
  // eslint-disable-next-line no-console
  console.log(...args)
})

client.login(process.env.DISCORD_TOKEN)
