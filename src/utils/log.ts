import fs from 'fs/promises'

export const padding = ' '.repeat('yyyy-mm-ddThh:mm:ss.mmmZ (ERROR): '.length)
type LogType = 'info' | 'warn' | 'error'

/**
 * Pads a new lines in a message with spaces.
 * @param message The message to pad.
 * @returns The padded message.
 */
function padMessage(message: string) {
  return message.replace(/\n/g, '\n' + padding)
}

/**
 * Log a message to the console and to a file.
 * @param message The message to log.
 * @param type The type of log message.
 * @param dry Whether to actually log the message or only return the output.
 * @returns A promise that resolves when the message has been logged.
 */
async function log(message: unknown, type: LogType, dry = false) {
  let output = new Date().toISOString()

  switch (typeof message) {
    case 'string':
      break
    case 'object':
      message = JSON.stringify(message, null, 2)
      break
    case 'undefined':
      message = 'undefined'
      break
    default:
      /// @ts-expect-error
      message = message.toString()
      break
  }

  const paddedMessage = padMessage(message as string)

  switch (type) {
    case 'info':
      output += ' (INFO):  ' + paddedMessage
      if (!dry) console.info(output)
      break
    case 'warn':
      output += ' (WARN):  ' + paddedMessage
      if (!dry) console.warn(output)
      break
    case 'error':
      output += ' (ERROR): ' + paddedMessage
      if (!dry) console.error(output)
      break
  }

  if (!dry) await fs.appendFile('log.txt', output + '\n')

  return output
}

/** A logger for the application. */
export default {
  /**
   * Log an info message.
   * @param message The message to log.
   * @param dry Whether to actually log the message or only return the output.
   * @returns A promise that resolves when the message has been logged.
   */
  info: async (message: unknown, dry = false) => log(message, 'info', dry),
  /**
   * Log a warning message.
   * @param message The message to log.
   * @param dry Whether to actually log the message or only return the output.
   * @returns A promise that resolves when the message has been logged.
   */
  warn: async (message: unknown, dry = false) => log(message, 'warn', dry),
  /**
   * Log an error message.
   * @param message The message to log.
   * @param dry Whether to actually log the message or only return the output.
   * @returns A promise that resolves when the message has been logged.
   */
  error: async (message: unknown, dry = false) => log(message, 'error', dry)
}
