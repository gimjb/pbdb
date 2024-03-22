import type discord from 'discord.js'

/** A function to represent the logic of an application command. */
export type CommandLogic = (interaction: discord.ChatInputCommandInteraction) => Promise<any>

/** A function to be called once all commands have been registered. */
export type CommandOnLoad = (client: discord.ChatInputApplicationCommandData[]) => void

/** An application command. */
export default interface ApplicationCommand {
  /** The metadata of the application command. */
  meta: discord.ChatInputApplicationCommandData
  /** The logic of the application command. */
  execute: CommandLogic
  /** A function to be called once all commands have been registered. */
  onLoad?: CommandOnLoad
}
