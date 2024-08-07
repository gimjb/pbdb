import fs from 'fs'
import discord from 'discord.js'
import log from '@gimjb/log'
import type ApplicationCommand from './ApplicationCommand'
import type {
  CommandLogic,
  CommandOnLoad
} from './ApplicationCommand'

const commandsMetadata: discord.ChatInputApplicationCommandData[] = []
const commandsLogic: Record<string, CommandLogic> = {}
const commandsOnLoad: CommandOnLoad[] = []

const files = fs.readdirSync(__dirname)

async function loadCommandsFromFiles (): Promise<void> {
  for (const file of files) {
    if (
      file.endsWith('.ts') ||
      file.endsWith('.map') ||
      file === 'index.js' ||
      file === 'ApplicationCommand.js'
    ) {
      continue
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command = require(`./${file}`).default as ApplicationCommand

    commandsMetadata.push(command.meta)
    commandsLogic[command.meta.name] = command.execute
    if (typeof command.onLoad === 'function') {
      commandsOnLoad.push(command.onLoad)
    }
  }
}

loadCommandsFromFiles().catch(log.error)

/** All application commands. */
export default {
  /** Metadata of all application commands. */
  metadata: commandsMetadata,
  /** Logic of all application commands. */
  logic: commandsLogic,
  /** Register all application commands to Discord. */
  register: async (client: discord.Client<true>) => {
    const rest = new discord.REST({ version: '10' }).setToken(client.token)

    await rest.put(discord.Routes.applicationCommands(client.user.id), {
      body: commandsMetadata
    }).then(console.info)

    for (const onLoad of commandsOnLoad) {
      void onLoad(commandsMetadata)
    }
  },
  /** Handle any command interaction. */
  handle: async (interaction: discord.ChatInputCommandInteraction) => {
    const command = commandsLogic[interaction.commandName]

    if (typeof command === 'undefined') return

    try {
      await command(interaction)
    } catch (error) {
      void log.error(error)
      if (interaction.replied) return

      await interaction.reply({
        content: ':x: Sorry, an unexpected error occurred. Please try again.',
        ephemeral: true
      }).catch(log.error)
    }
  }
} as const
