import discord from 'discord.js'
import 'dotenv/config'

const client = new discord.Client({
  intents: []
})

client.login(process.env['DISCORD_TOKEN'])
