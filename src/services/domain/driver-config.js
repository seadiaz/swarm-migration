const logger = require('winston')

class DriverConfig {
  constructor () {
    logger.silly('creating instance of %s', this.constructor.name)
    this.name = ''
    this.options = {}
  }
}

module.exports = DriverConfig
