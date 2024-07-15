import type discord from 'discord.js'

export interface CommandMetadata {
  /** The name of the command. */
  name: string
  /** The description of the command. */
  description: string
  /** The contexts where the command can be used. */
  contexts?: Array<0 | 1 | 2>
  /** The integration types where the command can be used. */
  integration_types?: Array<0 | 1>
  /** The options of the command. */
  options?: readonly discord.ApplicationCommandOptionData[]
}

/** A function to represent the logic of an application command. */
export type CommandLogic = (interaction: discord.ChatInputCommandInteraction) => Promise<any>

/** A function to be called once all commands have been registered. */
export type CommandOnLoad = (client: discord.ChatInputApplicationCommandData[]) => void

/** An application command. */
export default interface ApplicationCommand {
  /** The metadata of the application command. */
  meta: CommandMetadata
  /** The logic of the application command. */
  execute: CommandLogic
  /** A function to be called once all commands have been registered. */
  onLoad?: CommandOnLoad
}
