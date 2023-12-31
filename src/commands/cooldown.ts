import discord, { Permissions } from 'discord.js'
import { ApplicationCommandOptionType } from 'discord-api-types/v10'
import type ApplicationCommand from './ApplicationCommand'
import CooldownCache from '../CooldownCache'

const command: ApplicationCommand = {
  meta: {
    name: 'cooldown',
    description: 'Get or set the current verse cooldown in this server.',
    options: [
      {
        name: 'seconds',
        description: 'The new cooldown in seconds.',
        type: ApplicationCommandOptionType.Integer,
        required: false,
        minValue: 0,
        maxValue: 1800
      }
    ]
  },
  execute: async interaction => {
    if (!interaction.guildId) return

    const updatedValue = interaction.options.get('seconds')?.value as
      | number
      | undefined

    if (typeof updatedValue !== 'number') {
      return await interaction.reply({
        content:
          'The verse cooldown period in this server is currently ' +
          `**${CooldownCache.getCooldownValue(interaction.guildId)}** ` +
          'seconds. To change it, use `/cooldown <seconds>`. Please note ' +
          'that the “Manage Server” permission is required.',
        ephemeral: true
      })
    }

    const { member } = interaction

    if (!interaction.memberPermissions?.has('ManageGuild')) {
      return await interaction.reply({
        content:
          'You must have the “Manage Server” permission to change the ' +
          'cooldown.',
        ephemeral: true
      })
    }

    if (updatedValue < 0 || updatedValue > 1800) {
      return await interaction.reply({
        content:
          'The cooldown must be between 0 and 1800 seconds. Please try ' +
          'again.',
        ephemeral: true
      })
    }

    CooldownCache.setCooldownValue(interaction.guildId, updatedValue)

    return await interaction.reply({
      content:
        'The verse cooldown period in this server has been updated to ' +
        `**${updatedValue}** seconds.`,
      ephemeral: false
    })
  }
}

export default command
