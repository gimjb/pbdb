const { default: log, padding } = require('./log')

const datePattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.source

/**
 * Test a log method.
 *
 * @param {string} methodName
 * @returns {void}
 */
function testLogMethod(methodName) {
  describe(`log.${methodName}`, () => {
    const method = log[methodName]
    const patternPrefix = `^${datePattern} \\(${methodName.toUpperCase()}\\): {1,2}`

    it('should log a string', async () => {
      const output = await log[methodName]('a string with\na new line', true)
      expect(output).toMatch(
        new RegExp(patternPrefix + `a string with\n${padding}a new line$`)
      )
    })

    it('should log an object', async () => {
      const output = await log[methodName]({ a: 'b' }, true)
      expect(output).toMatch(
        new RegExp(
          patternPrefix + `\\{\\n${padding}  "a": "b"\\n${padding}\\}$`
        )
      )
    })

    it('should log an array', async () => {
      const output = await log[methodName](['a', 'b'], true)
      expect(output).toMatch(
        new RegExp(
          patternPrefix +
            `\\[\\n${padding}  "a",\\n${padding}  "b"\\n${padding}\\]$`
        )
      )
    })

    it('should log a number', async () => {
      const output = await log[methodName](1, true)
      expect(output).toMatch(new RegExp(patternPrefix + '1$'))
    })

    it('should log a boolean', async () => {
      const output = await log[methodName](true, true)
      expect(output).toMatch(new RegExp(patternPrefix + 'true$'))
    })

    it('should log a null', async () => {
      const output = await log[methodName](null, true)
      expect(output).toMatch(new RegExp(patternPrefix + 'null$'))
    })

    it('should log an undefined', async () => {
      const output = await log[methodName](undefined, true)
      expect(output).toMatch(new RegExp(patternPrefix + 'undefined$'))
    })
  })
}

testLogMethod('info')
testLogMethod('warn')
testLogMethod('error')
