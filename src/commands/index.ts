import fs from 'fs'
import discord from 'discord.js'
import type { CommandLogic, CommandMetadata } from './ApplicationCommand'

const commandsMetadata: CommandMetadata[] = []
const commandsLogic: Record<string, CommandLogic> = {}

const files = fs.readdirSync(__dirname)

for (const file of files) {
  if (
    !file.endsWith('.js') ||
    file === 'index.js' ||
    file === 'ApplicationCommand.js'
  )
    continue

  const command = require(`./${file}`).default

  commandsMetadata.push(command.meta)
  commandsLogic[command.meta.name] = command.execute
}

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
    })
  },
  /** Handle any command interaction. */
  handle: async (interaction: discord.CommandInteraction) => {
    const command = commandsLogic[interaction.commandName]

    if (!command) return

    try {
      await command(interaction)
    } catch (error) {
      console.error(error)
      await interaction.reply({
        content: ':x: Sorry, an unexpected error occurred. Please try again.',
        ephemeral: true
      })
    }
  }
} as const
